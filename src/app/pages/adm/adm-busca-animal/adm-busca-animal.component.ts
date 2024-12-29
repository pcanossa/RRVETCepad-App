import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { AnimaisAppService } from 'src/app/services/animais-app.service';

@Component({
  selector: 'app-adm-busca-animal',
  templateUrl: './adm-busca-animal.component.html',
  styleUrls: ['./adm-busca-animal.component.css']
})
export class AdmBuscaAnimalComponent {

  tutor: any;
  animais: any;
  tokenLy: any;
  faturas: any;
  httpToken: any;
  formaAquisicao: any;
  masgError: any;
  users: any;
  animalDates: any;

  agendamento: FormGroup = this.formBuilder.group({
    id: [0, Validators.required],
  })

  public dadoAgendamento: FormGroup = this.formBuilder.group({
    unidade: ['', Validators.required],
    mes: ['', Validators.required],
    tipo: ['', Validators.required],
    dataHora: ['', Validators.required]
  })

  meses = {
    Janeiro: '01',
    Fevereiro:'02',
    Março: '03',
    Abril: '04',
    Maio: '05',
    Junho: '06',
    Julho: '07',
    Agosto: '08',
    Setembro: '09',
    Outubro: '10',
    Novembro: '11',
    Dezembro: '12'
  };


  animal: FormGroup = this.formBuilder.group({
    rga: ['', Validators.required]
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

  }


  public getCli (headers: any) {
    this.app.consultaCli({cpf: this.clientes.value.cpf}, headers)
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
          console.log(this.faturas[length].status === 'canceled');
          if (this.faturas.length === 0 || this.faturas[length-1].status === 'canceled') {
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


    public async consultaAnimais(headers:any) {
      this.animalApp.consultaAnimais({
        rga: this.animal.value.rga
      }, this.httpOptions)
      .subscribe ({
        next: ((res)=> {
          console.log('oi');
          this.animalDates = res[0];
          this.masgError = null;

          console.log(this.animalDates);
          this.masgError = undefined;
        }),
        error: ((err)=> {
          this.masgError = err;
          this.animais = [];
          ;})
      })
  }

  enviarID (animalId: any, id:any, nome:any, especie:any, raca:any, cor:any, sexo:any, idade:any, particularidades:any, rga:any, urlfoto:any, tutor:any, telefone:any, rua:any, numero:any, bairro:any, cidade:any, cpf:any, tipo:any, cep:any, porte:any) {
    localStorage.setItem('animalDates', JSON.stringify({
      animalId: animalId,
      id: id,
      nome: nome,
      raca: raca,
      especie: especie,
      cor: cor,
      sexo: sexo,
      idade: idade,
      particularidades: particularidades,
      rga: rga,
      urlfoto: urlfoto,
      tutor: tutor,
      telefone: telefone,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      cpf: cpf,
      tipo: tipo,
      cep: cep,
      porte: porte
    }))
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


}
