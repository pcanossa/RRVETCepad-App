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

  httpOptions = {
    headers: this.headers
  };

  validados: any[] = [];
  vet: any;

  constructor(private app: FuncionarioService, private router: Router) { }

  async ngOnInit() {
    try {
      await this.validaVeterinario();
      console.log(this.vet)

      try {
        await this.getAtendimentoVet();
      } catch {

      }

    } catch (err:any) {

    }

    try {
      console.log('entrou');

      this.getAtendimentoVet();
    } catch (err:any) {

    }
    console.log(this.funcDates)
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

  async getAtendimentoVet () {
    console.log(this.vet)
      this.app.getAtdVet(this.vet[0].vet_id, this.httpOptions)
      .subscribe({
        next: ((res)=> {
          console.log(res);
          this.atendimentos = res.agenda;
          this.msgError = res.message;

        }),
        error: ((err)=>(this.msgError = err.message))

      })

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

  async validaVeterinario () {
    try {
      await this.app.validaVet({id: this.funcDates.id}, this.httpOptions)
      .subscribe({
        next: ((res)=> {
          this.vet = res;
          this.msgError = res.message;
          console.log(this.vet);

        }),
        error: ((err)=>(this.msgError = err.message))

      })
    } catch (err) {
      this.msgError = err
      return this.msgError
    }
  }

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

  async iniciaAtendimento (aniId: number, i:number) {
    return new Promise(async (resolve, reject) => {
      await this.app.iniciaAtendimento({
        dataHora: this.getSQLDateHourForm(),
        aniId: aniId,
        vetId: this.vetValidate[0].vet_id
       }, this.httpOptions).subscribe({
        next: ((res)=> {
          localStorage.setItem('atdDates', JSON.stringify({id: res, agdDates: i}));
          resolve(this.router.navigate(['/app-atendimento']))
        }),
        error: ((err)=> reject(err))
       })
    })
  }




}
