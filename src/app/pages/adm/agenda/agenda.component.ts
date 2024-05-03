import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimaisAppService } from 'src/app/services/animais-app.service';
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

  animal: FormGroup = this.formBuilder.group({
    rga: ['', Validators.required]
  });

  clientes: FormGroup = this.formBuilder.group({
    nome: ['', Validators.required]
  });




  iterador: number = 0;
  agendaSemana: any;
  datasSemana: any;
  dadosAgenda: any;
  dadosArray:any [] = [];
  iteradorDia:number = 6;
  unidade: any;
  unidSelected: any;
  tutor: any;
  animais: any;
  tokenLy: any;
  faturas: any;
  httpToken: any;
  formaAquisicao: any;
  masgError: any;
  users: any;
  animalDates: any;
  agendaNovo:boolean =  false;
  collapsed:boolean = false;
  veterinarios: any;

  agendamento: FormGroup = this.formBuilder.group({
    id: [0, Validators.required],
  })

  public dadoAgendamento: FormGroup = this.formBuilder.group({
    unidade: ['', Validators.required],
    mes: ['', Validators.required],
    tipo: ['', Validators.required],
    dataHora: ['', Validators.required],
    pedido: [null]
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
  ];


  tipoAtendimento = [
    'Encaixe',
    'Cirurgia',
    'Retorno',
    'Especialista',
    'Exames',
  ];

  outra: any[]=[];

  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`
  });

  httpOptions = {
    headers: this.headers
  };

  constructor(private app:FuncionarioService, private AdmApp: FuncionarioService, private formBuilder: FormBuilder, private animalApp: AnimaisAppService) { }

  async ngOnInit(): Promise<void> {
    this.pegaSemana();
    this.pegaVets();
  }

  collapseAtend () {
    if (this.collapsed === false) {
      this.collapsed = true;
    } else {
      this.collapsed = false;
    }
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

  pegaVets() {
    this.app.getVets(this.httpOptions).subscribe({
      next: ((res)=> {
        this.veterinarios = res;
        console.log(this.veterinarios);
      }),
      error: ((err)=> {
        console.log(err);
      })
    }
    )
  }

  novoAgenda () {
    if (this.agendaNovo) {
      this.agendaNovo = false;
    } else {
      this.agendaNovo = true;
    }
  }

  pegaDiaHorario() {
    const dataHora = this.dadoAgendamento.value.dataHora;
    const data = dataHora.getUTCFullYear().toString+"-"+dataHora.getUTCMonth().toString+"-"+dataHora.getDayOfWeek().toString;


    const hora = dataHora.getUTCHours()+":"+dataHora.getUTCMinutes()+":"+dataHora.getUTCSeconds();

    return [data, hora]
  }

  adicionaAgenda() {
    this.app.agendaNovo(
      {
        data: this.pegaDiaHorario()[0],
        horario: this.pegaDiaHorario()[1],
        pedido: this.dadoAgendamento.value.pedido,
        conclusao: 'Agendado',
        tipo: this.dadoAgendamento.value.tipo,
        rga: this.animalDates.animalId,
        veterinário: this.dadoAgendamento.value.veterinário
      },
      this.httpOptions
    )
  }

  consultaVets () {

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

  enviarID (id:any, nome:any, especie:any, raca:any, cor:any, sexo:any, idade:any, particularidades:any, rga:any, urlfoto:any, tutor:any, telefone:any, rua:any, numero:any, bairro:any, cidade:any, cpf:any, tipo:any, cep:any, porte:any, animalId: any) {
    localStorage.setItem('animalDates', JSON.stringify({
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
      porte: porte,
      animalId: animalId
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
