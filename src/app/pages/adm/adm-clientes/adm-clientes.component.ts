import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { AnimaisAppService } from 'src/app/services/animais-app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-clientes',
  templateUrl: './adm-clientes.component.html',
  styleUrls: ['./adm-clientes.component.css']
})
export class AdmClientesComponent implements OnInit {

  tutor: any;
  animais: any;
  tokenLy: any;
  faturas: any;
  httpToken: any;
  formaAquisicao: any;
  masgError: any;
  users: any;

  cliente: FormGroup = this.formBuilder.group({
    cpf: ['', Validators.required]
  });

  clientes: FormGroup = this.formBuilder.group({
    nome: ['', Validators.required]
  })

  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headersDois = new HttpHeaders({
    'Authorization': `${this.token}`,
    'enctype': 'multipart/form-data'
  });

  headers = new HttpHeaders({
    'Authorization': `${this.token}`,
  });

  httpOptions = {
    headers: this.headers
  };

  constructor(private formBuilder: FormBuilder, private app: FuncionarioService, private animalApp: AnimaisAppService) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.consultaUsers();
    } catch (err) {
      console.log(err);
    }
  }


  public getCli (headers: any) {
    this.app.consultaCli({cpf: this.cliente.value.cpf}, headers)
    .subscribe({
      next: ((res:any)=> {
        this.tutor = res.produtos;
        console.log(this.tutor);
      }),
      error: ((err:any)=> {
        console.log(err.message);
      })
    })
  }

  public getCliNome (headers: any) {
    this.app.getNome({nome: this.clientes.value.nome}, headers)
    .subscribe({
      next: ((res:any)=> {
        this.tutor = res.clientes;
        console.log(this.tutor)
      }),
      error: ((err:any)=> {
        console.log(err.message);
      })
    })
  }

  public getFaturas (cpf: any) {
    return new Promise(async (resolve, reject)=> {
      await this.app.faturaPessoa(cpf, this.httpToken).subscribe({
        next: ((res:any)=> {
          this.faturas = res.results;
          console.log(this.faturas);
          if (this.faturas.length === 0) {
            this.faturas = [
              {
                status: 'paid',
              }
            ];
            this.formaAquisicao = 'Á Vista';
          } else {

              this.formaAquisicao = 'Parcelado 12x';

          }
          resolve(this.faturas);
        }),
        error: ((err:any)=>{
          console.log(err.message);
          reject(err.message);
        })
      })
    })
  }

  public cancel(id:any) {
    return new Promise(async (resolve, reject) => {
      await this.app.cancelParcels(id, this.httpToken).subscribe({
        next: ((res)=> {
          resolve(res);
        }),
        error: ((err)=> reject(err.message))
      })
    })
  }

  public getToken () {
    return new Promise(async (resolve, reject)=> {

        await this.app.catchToken().subscribe({
          next: ((res)=> {
            console.log(res.accessToken);
            this.tokenLy = new HttpHeaders({
              'Authorization': `Bearer ${res.accessToken}`
            });
            this.httpToken = {
              headers: this.tokenLy
            }
            resolve(this.httpToken);
          }),
          error: ((err)=> {
            reject(err);
          })
        })
      })
    }

    public async getFaturaPessoa(cpf: string) {
      this.faturas = [];
      try {
        await this.getToken()
        console.log(this.tokenLy);

        console.log('entrou');
        await this.getFaturas(cpf);


      } catch (err) {
        console.log(err);
      }
    }

    public async cancelParcels(id: any) {
      try {
        await this.getToken()
        console.log(this.tokenLy);

        console.log('entrou');
        await this.cancel(id);


      } catch (err) {
        console.log(err);
      }
    }


    public async consultaAnimais(rga: number) {
      this.animalApp.consultaAnimais({
        rga: rga
      }, this.httpOptions)
      .subscribe ({
        next: ((res)=> {
          this.animais = res.animais;
          console.log(this.animais);
          this.masgError = undefined;
        }),
        error: ((err)=> {
          this.masgError = err;
          this.animais = [];
          ;})
      })
  }

  public async consultaUsers () {
    return new Promise (async (resolve, reject)=> {
      return this.app.getUsers(this.httpOptions).subscribe({
        next: ((res)=> {
          this.tutor = res;
        }),
        error: ((err)=> {
          console.log(err);
        })
      })
    })
  }

  formatDateForm(dateString:any) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  retornaStatus (status:string) {
    if (status === 'waitingPayment') {
      return 'Aguardando Pagamento'
    } else if (status === 'paid'){
      return 'Pago'
    } else {
      return 'Vencido'
    }
  }



  formatarTelefone(numero: string): string {
    const ddd = numero.slice(0, 2);
    const parte1 = numero.slice(2, 7);
    const parte2 = numero.slice(7);

    return `(${ddd}) ${parte1}-${parte2}`;
  }

  showConfirmation() {
    Swal.fire({
      title: 'Você tem certeza que deseja excluir essa fatura?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result:any) => {
      if (result.isConfirmed) {
        // Coloque aqui a função que deve ser executada ao clicar em "Sim"
        Swal.fire(
          'Excluído!',
          'Sua fatura foi excluída.',
          'success'
        )
      }
    })
  }


}
