import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDates = JSON.parse(localStorage.getItem('userDates') ?? '{}');
  funcDates = JSON.parse(localStorage.getItem('funcDates') ?? '{}');
  nomeColaborador: any;

  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`
  });

  httpOptions = {
    headers: this.headers
  };

  constructor(private app: FuncionarioService) { }

  ngOnInit(): void {
    this.dadosColaborador();
    console.log(this.token);


    console.log(this.userDates, this.funcDates)
  }

  public async  dadosColaborador() {
    (await this.app.colaborador({id: this.funcDates.id},this.httpOptions))
    .subscribe ({
      next: ((res:any)=> {
        this.nomeColaborador = res;
      }),
      error: ((err:any)=> {
        console.log(err);
      })
    })
  }

}
