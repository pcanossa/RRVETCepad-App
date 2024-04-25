import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode/public-api';
import { AnimaisAppService } from 'src/app/services/animais-app.service';


@Component({
  selector: 'app-app-agenda-atendimento',
  templateUrl: './app-agenda-atendimento.component.html',
  styleUrls: ['./app-agenda-atendimento.component.css']
})
export class AppAgendaAtendimentoComponent implements OnInit {

  @ViewChild('scanner') scanner: any;
  qrCodeData:any [] = [];

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

  AfterViewChecked() {
    console.log('enter');
      this.scanner.data.subscribe((data: any) => {
        this.consultaCart(data[0].value);
        console.log(data[0].value);

      });

  }

  animal: any;
  msgError: string = "";
  arCodeData:any;
  valid:boolean = false;
  QRCode: boolean= false;
  datas: any[]= [];
  indexHorarios: any[]= [];
  userDates = JSON.parse(localStorage.getItem('userDates') ?? '{}');
  clientId: any
  animais: any;
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
  agd: any;
  agendamentoComum: boolean = false;
  agendamentoExtra: boolean = false;
  Validacao: boolean = false;


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

  tipoAtendimento = [
    'Emergência',
    'Encaixe',
    'Cirurgia',
    'Retorno',
    'Pet Home',
    'Coleta de Exame',
    'Vacina'
  ]


  carteirinha: FormGroup = this.formBuilder.group({
    numero: ['', Validators.required]
  })





  constructor(private app: FuncionarioService, private formBuilder: FormBuilder, private animalApp: AnimaisAppService) { }

  ngOnInit(): void {
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
        error: ((err:any) => {
          this.msgError = err.message + err.erro;
        })
      })
  }

  public async realizaAgendamento() {
    this.animalApp.realizaAgebdamento({
      idDia: this.agendamento.value.id,
      idAnimal: this.animal[0].ani_id,
      tipo: 'Consulta',
      status: 'Agendado'
    }, this.httpOptions)
    .subscribe({
      next: ((res)=> {
        this.agenda = false;
        this.agendamentoComum = false;
      this.agendamentoExtra = false;
      this.Validacao = false;
        return this.msgSucesso = res.message;
      }),
      error: ((err) => {
        this.msgError = err.message + err.erro;
        console.log(this.msgError);
      })
    })
  }

  public async realizaAgendamentoExtra() {
    this.animalApp.realizaAgendamentoExttra({
      animalId: this.animal[0].ani_id,
      tipo: this.dadoAgendamento.value.tipo,
      diaHora: this.formataDiaHoraExtra(this.dadoAgendamento.value.dataHora),
      unidade: this.dadoAgendamento.value.unidade
    }, this.httpOptions)
    .subscribe({
      next: ((res)=> {
        this.agenda = false;
        this.agendamentoComum = false;
    this.agendamentoExtra = false;
    this.Validacao = false;
        return this.msgSucesso = res.message;
      }),
      error: ((err) => {
        this.msgError = err;
        console.log(this.msgError);
      })
    })
  }



  formataDiaHoraExtra (diaHora: any) {
    const dia = String(new Date(diaHora).getDate()).padStart(2, '0');
    const mes = String((new Date(diaHora).getMonth()+1)).padStart(2, '0');
    const ano = new Date(diaHora).getFullYear();
    const hora = String(new Date(diaHora).getHours()).padStart(2, '0');
    const minutos = String(new Date(diaHora).getMinutes()).padStart(2, '0');

    return `${ano}-${mes}-${dia} ${hora}:${minutos}:00`;
  }



  async consultaCart (numCart:string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      console.log(this.carteirinha.value.numero);
      this.app.consultaCarteirinha({ numCart: numCart }, this.httpOptions)
      .subscribe({
        next: (res)=> {
          console.log(res);
          this.msgError = "";
          this.msgSucesso = "";
          this.animal = res.carteirinha;
          console.log(this.animal);
          if (this.animal.lenght !== 0) {
            this.valid = true;
          }
        },
        error: (err)=> {
          this.valid=false;
          this.msgError = err;
          console.log(this.msgError);
        }
      })
    })
  }



  consultaHorariosDisponiveis () {
    this.agendamentoComum = true;
    this.agendamentoExtra = false;
    this.msgError = '';
    this.msgSucesso = '';
  }

  novoExtra() {
      this.agendamentoComum = false;
      this.agendamentoExtra = true;
      this.msgError = '';
      this.msgSucesso = '';
  }

  LeQRCode () {
    return this.QRCode = true;
  }

  validaConsulta () {
    this.Validacao = true;
    this.agendamentoComum = false;
      this.agendamentoExtra = false;
      this.msgError = '';
      this.msgSucesso = '';
  }

  consultaAgdAnimal (aniId: any): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.app.conultaAgdAnimal({aniId: aniId}, this.httpOptions)
      .subscribe({
        next: ((res)=> {
          this.agenda = false;
          this.agendamentoComum = false;
          this.agendamentoExtra = false;
          this.Validacao = false;
          resolve(this.agd = res.agd);

        }),
        error: (err)=> {
          reject(this.msgError = err);
        }
      })
    })

  }

  calcIdade(dateNascimento: string) {
    const hoje = new Date();
    let dataNascimento = new Date(dateNascimento);
    let anos = hoje.getFullYear() - dataNascimento.getFullYear();
    let meses = hoje.getMonth() - dataNascimento.getMonth();

    if (hoje.getDate() < dataNascimento.getDate()) {
      meses--;
    }

    if (meses < 0) {
      anos--;
      meses += 12;
    }

    return `${anos} anos e ${meses} mês(es)`;
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

  formatDateForm(dateString:any) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  valida (idCart: any): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.app.valida({idCart: idCart}, this.httpOptions)
      .subscribe({
        next: ((res)=> {
          this.agenda = false;
          this.agendamentoComum = false;
          this.agendamentoExtra = false;
          this.Validacao = false;
          this.msgSucesso = res.message;
        }),
        error: (err)=> {
          this.msgError = err;
        }
      })
    })

  }

  desmarca (idAgd: any, tipo: any): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.app.desmarca({idAgd: idAgd, tipo: tipo}, this.httpOptions)
      .subscribe({
        next: ((res)=> {
          this.agenda = false;
          this.agendamentoComum = false;
          this.agendamentoExtra = false;
          this.Validacao = false;
          this.msgSucesso = res.message;
        }),
        error: (err)=> {
          this.msgError = err;
        }
      })
    })

  }

  adicionarObjeto(dataInicial: string, dataFinal: string) {
    const objeto = {
      dataInical: dataInicial,
      dataFinal: dataFinal
    };

    this.datas.push(objeto);
  }

  formatHour(hour:any) {
    const hora = new Date(hour).getHours();
    return hora
  }

  formatHourMinutes(hour:any) {
    const hora = String(new Date(hour).getUTCHours()).padStart(2, '0');
    const minutos = String(new Date(hour).getUTCMinutes()).padStart(2, '0');
    return `${hora}h:${minutos}`;
  }


  teste() {
   console.log(this.dadoAgendamento.value.dataHora);
   const teste = {
      animalId: this.animal[0].ani_id,
      tipo: this.dadoAgendamento.value.tipo,
      diaHora: this.formataDiaHoraExtra(this.dadoAgendamento.value.dataHora),
      unidade: this.dadoAgendamento.value.unidade
    }

    console.log(teste);
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
