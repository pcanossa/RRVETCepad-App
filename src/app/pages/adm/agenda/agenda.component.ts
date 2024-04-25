import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from 'src/app/services/funcionario.service';



@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  local: FormGroup = this.formBuilder.group({
    unidade: ['', Validators.required]
  })

  iterador: number = 0;
  agendaSemana: any;
  datasSemana: any;
  dadosAgenda: any;
  dadosArray:any [] = [];
  iteradorDia:number = 6;
  unidade: any;
  unidSelected: any;

  index= [
    'agd_07h',
    'agd_08h',
    'agd_09h',
    'agd_10h',
    'agd_11h',
    'agd_12h',
    'agd_13h',
    'agd_14h',
    'agd_15h',
    'agd_16h',
  ]

  diasSemana = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
  ]

  outra: any[]=[];

  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`
  });

  httpOptions = {
    headers: this.headers
  };

  constructor(private app:FuncionarioService, private AdmApp: FuncionarioService, private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.pegaSemana();

  }


  async pegaAgenda (): Promise<any> {
    return new Promise((resolve, reject) => {
      this.app.retornaSemana({
        iterador: this.iterador,
        unidade: this.unidSelected
      }, this.httpOptions)
      .subscribe({
        next: ((res)=> {
          console.log('primeiro'+this.iterador);
          console.log('segundo'+this.unidSelected);
          this.agendaSemana = res;
          this.dadosAgenda = this.agendaSemana.semana;
          console.log('sss'+this.dadosAgenda);

          //   console.log(dia);
          //   console.log(this.formatDate(dia.agd_data))
          //   console.log(this.formatDate(this.datasSemana[6]))
          // }
          resolve(this.agendaSemana)
        }),
        error: ((err)=> {
          console.log(err);
          reject(err.message)
        })
      })
    })
  }

  retornaHora (index: string) {
    return index.replace('agd_', '')
  }

  verificaHora(index:string) {
    let existe
    for (let dia of this.dadosArray) {
      for (let hora of dia) {
        const agd = hora[index]!=null;
        const dia = this.formatDate(hora.agd_data)=== this.formatDate(this.datasSemana[0]);
        if (agd && dia) {
          existe = true;
        } else {
          existe = false;
        }

      }
    }

    return existe

  }


  pegaSemana() {
    const dates = [];
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay(); // 0 (domingo) a 6 (sábado)
  const startOfWeek = new Date(currentDate); // Cria uma cópia da data atual
  startOfWeek.setDate(currentDate.getDate()+this.iterador - currentDayOfWeek); // Define o início da semana (domingo)

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(date);
  }

  console.log(dates);
  this.datasSemana = dates;
  console.log(this.datasSemana);
  let semaninha;
  let semaninhaArray = [];
  for (let i = 0; i < this.diasSemana.length; i++) {
    semaninha = {hora: this.datasSemana[i], dia: this.diasSemana[i]}
    semaninhaArray.push(semaninha);
  }

  console.log(semaninhaArray);

  return this.outra = semaninhaArray;

}

formatDate(dateString:any) {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

formatHour(hour:string) {
  const hora = String(new Date(hour).getUTCHours()).padStart(2, '0');
  console.log(hora);
  const minutos = String(new Date(hour).getUTCMinutes()).padStart(2, '0');
  return `${hora}:${minutos}`
}

async somaIterador () {

    this.dadosArray.splice(0, this.dadosArray.length);

    this.iterador+=7;

    console.log('talvez'+this.iterador);

    this.pegaSemana();
    try {
      this.pegaAgenda();
    } catch (err) {
      console.log(err);
    }

}




async diminuiIterador () {

  this.dadosArray.splice(0, this.dadosArray.length);


    this.iterador-=7;

  console.log(this.iterador)

  this.pegaSemana();
  try {
    this.pegaAgenda();
  } catch (err) {
    console.log(err);
  }
}

}
