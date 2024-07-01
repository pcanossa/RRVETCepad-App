import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map, of, startWith } from 'rxjs';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-enfermagem',
  templateUrl: './app-enfermagem.component.html',
  styleUrls: ['./app-enfermagem.component.css']
})
export class AppEnfermagemComponent {





  atdDates = JSON.parse(localStorage.getItem('atdDates') ?? '{}');
  funcDates = JSON.parse(localStorage.getItem('funcDates') ?? '{}');
  vetDates = JSON.parse(localStorage.getItem('vetDates') ?? '{}');



  fila:any;

  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`
  });


  httpOptions = {
    headers: this.headers
  };




  constructor(private app: FuncionarioService, private formBuilder: FormBuilder, private router: Router) { }

  realizacoes: any [] = [];
  message: any;

  async ngOnInit(): Promise<void> {
    try {
      this.pegaFilaAplicacoes();
    } catch (err) {
      console.error(err);
    }
  }



  async pegaFilaAplicacoes() {
    try {
      this.app.pegaAplicacoes(this.httpOptions)
      .subscribe({
        next:((response)=> {
          this.fila = response.fila
          console.log(this.fila);
        }),
        error: ((error)=>{console.log(error)})
      })
    } catch (error) {

    }
  }

  onCheckboxChange(event: Event, id: number, index:number) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.pegaIds(id);
    } else {
      this.removeArray(id);
    }
  }


  pegaIds (id:number) {
    this.realizacoes.push(id);
  };

  removeArray(id: number) {
    const index = this.realizacoes.indexOf(id);
    if (index > -1) {
      this.realizacoes.splice(index, 1);
    }
  }

  async updateAplicacoes () {
    try {
      await this.app.registraAplicacoes({
        array: this.realizacoes,
        id: this.funcDates.col_id
      }, this.httpOptions).subscribe({
        next:((response)=> {
          this.message = response.message
        }),
        error: ((error)=>{console.log(error)})
      })

      try {
        await this.pegaFilaAplicacoes();
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }




}


