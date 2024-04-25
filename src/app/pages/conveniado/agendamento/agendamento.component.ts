import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimaisAppService } from 'src/app/services/animais-app.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  datasDisponiveis: any;
  msgSucesso: any;
  nsgError: any;
  agenda:boolean = false;
  iterador: number =0;
  diasMes: number = 0;
  dataInicial: string = '';
  dataFinal: string = '';
  objetosPorDia:any [] = [];
  dias: any[] = [];

  public dadoAgendamento: FormGroup = this.formBuilder.group({
    animal: [0, Validators.required],
    unidade: ['', Validators.required],
    mes: ['', Validators.required]
  })

  public agendamento: FormGroup = this.formBuilder.group({
    id: [[], Validators.required],
  })

  datas: any[]= [];
  indexHorarios: any[]= [];
  userDates = JSON.parse(localStorage.getItem('userDates') ?? '{}');
  clientId: any
  msgError: any
  animais: any;
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

  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`
  });

  httpOptions = {
    headers: this.headers
  };

  constructor(private animalApp: AnimaisAppService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.clientId = this.userDates.id;
    this.consultaAnimais();
    this.iterador;
  }

  adicionarObjeto(dataInicial: string, dataFinal: string) {
    const objeto = {
      dataInical: dataInicial,
      dataFinal: dataFinal
    };

    this.datas.push(objeto);
  }

  public async consultaAnimais() {
    this.animalApp.consultaAnimais({
      rga: this.animais.value.rga
    }, this.httpOptions)
    .subscribe ({
      next: ((res)=> {
        this.animais = res.animais;
      }),
      error: ((err)=> {
        this.msgError = err;
    })
    })
  }

  public async consultaAgenda(header:any) {
    this.animalApp.consultaAgenda({
      unidade: this.dadoAgendamento.value.unidade,
      dataInicial: this.dataInicial,
      dataFinal: this.dataFinal
    }, header)
      .subscribe({
        next: ((res) => {
          this.dias = [];
          this.iterador = 0;
          this.datasDisponiveis = res.datasDisponiveis;
          let index;
            for (let i=0; i<this.datasDisponiveis.length; i++) {
              let dia = new Date(this.datasDisponiveis[i].agd_data_hora).getDate()
              let prox;

              if (i < this.datasDisponiveis.length - 1) {
                prox = new Date(this.datasDisponiveis[i + 1].agd_data_hora).getDate();
              }

              if (dia === prox) {
                this.objetosPorDia.push(this.datasDisponiveis[i])
              } else {
                this.objetosPorDia.push(this.datasDisponiveis[i])
                this.dias.push(this.objetosPorDia)
                this.objetosPorDia = [];
              }
            }




            this.agenda = true;

        }),
        error: ((err) => {
          this.msgError = err.message + err.erro;
        })
      })
  }

  public async realizaAgendamento() {
    this.animalApp.realizaAgebdamento({
      idDia: this.agendamento.value.id,
      idAnimal: this.dadoAgendamento.value.animal,
      tipo: 'Consulta',
      status: 'Agendado'
    }, this.httpOptions)
    .subscribe({
      next: ((res)=> {
        this.agenda = false;
        return this.msgSucesso = res.message;
      }),
      error: ((err) => {
        this.msgError = err.message + err.erro;
        console.log(this.msgError);
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

  formatHour(hour:any) {
    const hora = new Date(hour).getHours();
    return hora
  }


  formatDate() {
    const mesSelecionado = parseInt(this.dadoAgendamento.value.mes);
    const anoAtual = new Date().getUTCFullYear();
    const diaAtual  = new Date().getUTCDate();
    const mesAtual = new Date().getUTCMonth();
    let dataInicial;
    let dataFinal;
    let horaAtual = new Date().getHours();
    let minutoAtual = new Date().getMinutes();
    if ((mesAtual+1) === mesSelecionado) {
      dataInicial = `${anoAtual}-${String(mesSelecionado).padStart(2, '0')}-${diaAtual} ${horaAtual}:${minutoAtual}:00`
    } else {
      dataInicial = `${anoAtual}-${String(mesSelecionado).padStart(2, '0')}-01`;
    }
    dataFinal = `${anoAtual}-${String(mesSelecionado).padStart(2, '0')}-${String(this.obterUltimoDiaDoMes(anoAtual, this.dadoAgendamento.value.mes)).padStart(2, '0')}`;
    dataFinal = new Date(dataFinal);
    console.log(dataFinal);
    dataFinal.setDate(dataFinal.getUTCDate()+1);
    dataFinal.setMonth(dataFinal.getMonth() + 1);
    console.log(dataFinal);
    let diaFinal = String(dataFinal.getDate()).padStart(2, '0');
    let mesFinal = String(dataFinal.getUTCMonth()).padStart(2, '0');
    let anoFinal = String(dataFinal.getUTCFullYear()).padStart(2, '0');
    this.dataFinal = `${anoFinal}-${mesFinal}-${diaFinal}`;
    console.log(this.dataFinal);
    this.dataInicial = dataInicial;


    this.adicionarObjeto(this.dataInicial, this.dataFinal);
  }

  teste() {
    console.log(this.agendamento.value.id);
    console.log(this.agendamento.value.id[0]);
    console.log(this.agendamento.value.id[1]);
    console.log(this.dadoAgendamento.value.animal);
    console.log(this.animais);
  }

  somaIterador () {
    if (this.iterador < (this.dias.length-1)) {
      this.iterador++;
    }
  }

  isNumber(value: any): boolean {
    return typeof value === 'string';
  }

  diminuiIterador () {
    if (this.iterador > 0) {
      this.iterador--;
      console.log(this.datasDisponiveis);
      console.log(this.indexHorarios);
    }
  }

  verificaMes(): boolean {
    const mesHoje = new Date().getUTCMonth();
    const mesEscolhido = new Date(this.dataInicial).getUTCMonth();
    if ((mesHoje) > (mesEscolhido)) {
       return  false;
    }
     return true;
  }

  obterUltimoDiaDoMes(ano: number, mes: string) {
    const mesesCom31Dias = ['01', '03', '05', '07', '08', '10', '12'];
    const mesesCom30Dias = ['04', '06', '09', '11'];

    if (mesesCom31Dias.includes(mes)) {
      return '31';
    } else if (mesesCom30Dias.includes(mes)) {
      return '30';
    } else {
      // Tratamento especial para fevereiro (considerando ano bissexto)
      const anoBissexto = (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
      return anoBissexto ? '30' : '29';
    }
  }


}
