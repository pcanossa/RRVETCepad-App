import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Router } from '@angular/router';
import { animate } from '@angular/animations';

@Component({
  selector: 'app-app-vet',
  templateUrl: './app-vet.component.html',
  styleUrls: ['./app-vet.component.css']
})
export class AppVetComponent {

  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`
  });

  funcDates = JSON.parse(localStorage.getItem('funcDates') ?? '{}');
  msgError: any;
  vetValidate: any;
  pex: any;
  atendimentos: any;
  atendimentosVet: any;
  exames: any;

  httpOptions = {
    headers: this.headers
  };

  validados: any[] = [];
  vet: any;
  anexos: any;

  constructor(private app: FuncionarioService, private router: Router) { }

  async ngOnInit() {
    try {
        await this.validaVeterinario();
        console.log('Dados Vet da validação, no OnInit:' + this.vet);

        try {
            await this.getAtendimentoVet();

        } catch (error) {
            // Lida com erros em getAtendimentoVet()
        }

        try {
          await this.consultaAtendimentosRealizados();
        } catch (error) {
          console.log(error);
        }

        try {
          await this.getFilaExames();
        } catch (error) {
          console.log(error);
        }




    } catch (error) {
        // Lida com erros em validaVeterinario()
    }
    console.log(this.atendimentos);
}


  async getValidados (): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      await this.app.consultaValidados(this.httpOptions)
      .subscribe ({
        next: ((res)=>{
          this.validados = res.validados;
          console.log(res.validados);
          console.log(this.validados)

          resolve(this.validados)
        }),
        error: (err)=> reject (err)
      })
    })
  }

  async getFilaExames (): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      await this.app.pegaFilaExames(this.httpOptions)
      .subscribe ({
        next: ((res)=>{
          this.exames = res;
          console.log(res);
          console.log(this.exames)

          resolve(this.exames)
        }),
        error: (err)=> reject (err)
      })
    })
  }

  async getAtendimentoVet () {
    console.log('Dados vet pego da validação:'+this.vet)
      this.app.getAtdVet({id: this.vet[0].vet_id}, this.httpOptions)
      .subscribe({
        next: ((res)=> {
          console.log(res);
          this.atendimentos = res;
          this.msgError = res.message;
          console.log(this.atendimentos);

        }),
        error: ((err)=>(this.msgError = err.message))

      })

  }

  formataHora (hora:any) {
    return hora.slice(0, -3);
  }

  getSQLDateHourForm() {
    const date = new Date();
    const dia = String(new Date(date).getDate()).padStart(2, '0');
    const mes = String(new Date(date).getMonth()+1).padStart(2, '0');
    const year = new Date(date).getFullYear();
    const hora = new String(new Date(date).getHours()).padStart(2, '0');
    const minutos = String(new Date(date).getMinutes()).padStart(2, '0');

    console.log(`${year}-${mes}-${dia} ${hora}:${minutos}:00`);

    return `${year}-${mes}-${dia} ${hora}:${minutos}:00`;
  }

  formatDateForm(dateString:any) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  formatHourMinutes(hour:any) {
    const hora = String(new Date(hour).getUTCHours()).padStart(2, '0');
    const minutos = String(new Date(hour).getUTCMinutes()).padStart(2, '0');
    return `${hora}h:${minutos}`;
  }

  async consultaVeterinario(): Promise<any> {
    console.log(this.funcDates.id);
    return new Promise(async (resolve, reject) => {
      await this.app.consultaVet({codFunc: this.funcDates.id}, this.httpOptions)
      .subscribe ({
        next: ((res)=>{
          this.vetValidate = res.vet;
          localStorage.setItem('vetDates', JSON.stringify(this.vetValidate));
          resolve(this.vetValidate);
        }),
        error: ((err)=> {
          this.msgError = err;
          reject (err)
        })
      })
    })
  }

  async validaVeterinario() {
    try {
      const response = await this.app.validaVet({ id: this.funcDates.id }, this.httpOptions).toPromise(); // Convertendo Observable para Promise
      this.vet = response; // Atribuindo a resposta a this.vet
      this.msgError = response.message; // Definindo a mensagem de erro, se houver
      console.log('Dados Vet:', this.vet); // Verificando se os dados de vet estão corretos
    } catch (error) {
      this.msgError = error; // Lidando com erros
      console.error('Erro ao validar veterinário:', error);
      throw error; // Lançando o erro novamente para tratamento posterior
    }
  }

  getAtualDate () {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    const data = `${new Date(date).getFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
    return data
  }

  formatSQLDate () {
    const date = new Date();
    console.log(`${new Date(date).getFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`)
    return `${new Date(date).getFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`
  }

  async consultaAtendimentosRealizados () {
    try {
      this.app.getAtendimentosForVets(
        {id: this.vet[0].vet_id,
        dataInicial: this.formatSQLDate(),
        dataFinal: this.getAtualDate()
        }, this.httpOptions
      )
      .subscribe({
        next: ((res)=> {
          this.atendimentosVet = res.atendimentos;
          console.log(this.atendimentosVet);
        }),
        error: ((err)=> console.log(err))
      })
    } catch (err) {
      console.log(err);
    }
  }

  async getAnexos(id: number): Promise<any> {
    try {
      await this.app.pegaAnexos({id:id}, this.httpOptions).subscribe({
        next: ((res)=> {
          this.anexos =  res;
          console.log(this.anexos.aplicacoes.length);
        }),
        error: ((err)=> {
         console.log(err.message);
        })
      })
    } catch (error) {
      return console.log(error)
    }
  };

  async consultaExames (): Promise<any> {
    return new Promise(async (resolve, reject) =>{
      await this.app.filaExames(this.httpOptions)
      .subscribe({
        next: ((res)=> {
          this.pex = res.pex;
          resolve (this.pex);
        }),
        error: ((err)=> reject(err))
      })
    })
  }

  iniciaAtendimentoI (idAgd: number) {
    localStorage.setItem('agdDates', JSON.stringify({id: idAgd}));
  }

  async iniciaAtendimento (id: number) {
    return new Promise(async (resolve, reject) => {
      await this.app.pegaAgendamento({
        id: id
       }, this.httpOptions).subscribe({
        next: ((res)=> {
          localStorage.setItem('atdDates', JSON.stringify(res));
          resolve(this.router.navigate(['/app-atendimento']))
        }),
        error: ((err)=> reject(err))
       })
    })
  }




}
