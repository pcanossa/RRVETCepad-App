import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { HttpHeaders } from '@angular/common/http';
import { format } from 'date-fns';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-cad-boletos',
  templateUrl: './cad-boletos.component.html',
  styleUrls: ['./cad-boletos.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CadBoletosComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



}
