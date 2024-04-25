import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent implements OnInit {

  clientes: any;
  atendimentos: any;
  vacinas: any;
  animais: any;
  msgError: any;

  funcDates = JSON.parse(localStorage.getItem('funcDates') ?? '{}');

  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`
  });

  httpOptions = {
    headers: this.headers
  };


  constructor(private app: FuncionarioService) { }

  ngOnInit(): void {
    this.count(this.httpOptions)
  }


  public async count(headers:any) {
    (await this.app.getCount(headers))
    .subscribe ({
      next: ((res:any)=> {
        this.animais = res.contabilizacao.animais;
        this.clientes = res.contabilizacao.clientes;
        this.atendimentos = res.contabilizacao.atendimentos;
        this.vacinas = res.contabilizacao.vacinas;
      }),
      error: ((err:any)=> {
        this.msgError = err;
      })
    })
  }
}
