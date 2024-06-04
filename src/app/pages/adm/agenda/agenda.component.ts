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
  dadosGerais: any;
  agendaSemana: any;
  datasSemana: any;
  dadosAgenda: any;
  dadosArray:any [] = [];
  iteradorDia:number = 6;
  iteradorA: number = 0;
  unidade: any;
  unidSelected: any;
  exames: any;
  busca: any;
  tutor: any;
  animais: any;
  tokenLy: any;
  faturas: any;
  httpToken: any;
  formaAquisicao: any;
  masgError: any;
  users: any;
  especialidades: any;
  especialistas: any;
  animalDates: any;
  agendaNovo:boolean =  false;
  collapsed:boolean = false;
  veterinarios: any;
  succes: any;
  dia: any;
  dadoAgenda: boolean = false;
  marcador: any;
  agendamentosDia: any[] = [];
  agendaHora: any[] = [];
  agendamento: FormGroup = this.formBuilder.group({
    id: [0, Validators.required],
  })

  public dadoAgendamento: FormGroup = this.formBuilder.group({
    veterinario: ['', Validators.required],
    mes: ['', Validators.required],
    tipo: ['', Validators.required],
    dataHora: ['', Validators.required],
    pedido: [null],
    especialidade: [''],
    exame: [''],
    triagem: [''],
  });

  public dadoBusca: FormGroup = this.formBuilder.group({
    tipo: [''],
    referencia: [''],
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
    'Consulta',
    'Encaixe',
    'Cirurgia',
    'Retorno',
    'Especialista',
    'Exames',
    'Internação'
  ];

  tipoBusca = [
    'Todos',
    'Tipo Atendimento',
    'Veterinário'
  ]

  tiposTriagem =
    {
    naoUrgente: 'Não Urgente',
    poucoUrgente: 'Pouco Urgente',
    urgente: 'Urgente',
    muitoUrgente: 'Muito Urgente',
    emergencia: 'Emergência',
    nãoSeAplica: 'Não se Aplica',
  };
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
    await this.pegaVets();

    await this.pegaEspecialidades();

    await this.pegaExames();

    await this.pegaSemana();

    await this.atualizaAgenda();


  }

  async atualizaAgenda () {
    try {
      this.iteradorA = 0;
      console.log('pegouSemana');

      try {
        for (let semana of this.outra) {
          const data = new Date (semana.hora)
          const dia = String(data.getDate()).padStart(2, '0');
          const mes = String(data.getMonth()+1).padStart(2, '0');
          const ano = String(data.getFullYear());
          this.dia=`${ano}-${mes}-${dia}`;
          console.log('Data:', this.dia);
          console.log('Iterador:', this.iteradorA);
          await this.agenda();
          console.log('Marcador:', this.marcador); // Adicionado este log para verificar se há dados em 'this.marcador'
          this.agendamentosDia[this.iteradorA] = this.marcador.sort((a: any, b: any) => {
            const horaA = a.agd_horario.split(':').join(''); // Remove os dois pontos da string
            const horaB = b.agd_horario.split(':').join(''); // Remove os dois pontos da string
            return horaA.localeCompare(horaB); // Compara as horas formatadas
          });
          console.log('Agendamentos do dia:', this.agendamentosDia[this.iteradorA]); // Adicionado este log para verificar se os dados estão sendo atribuídos corretamente
          this.iteradorA++;
        }

        console.log('Agendamentos da semana:', this.agendamentosDia);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }

  }

  async atualizaAgendaEsp () {
    try {
      this.iteradorA = 0;
      await this.pegaSemana();
      console.log('pegouSemana');

      try {
        for (let semana of this.outra) {
          const data = new Date (semana.hora)
          const dia = String(data.getDate()).padStart(2, '0');
          const mes = String(data.getMonth()+1).padStart(2, '0');
          const ano = String(data.getFullYear());
          this.dia=`${ano}-${mes}-${dia}`;
          console.log('Data:', this.dia);
          console.log('Iterador:', this.iteradorA);
          await this.agendaEsp();
          console.log('Marcador:', this.marcador); // Adicionado este log para verificar se há dados em 'this.marcador'
          this.agendamentosDia[this.iteradorA] = this.marcador.sort((a: any, b: any) => {
            const horaA = a.agd_horario.split(':').join(''); // Remove os dois pontos da string
            const horaB = b.agd_horario.split(':').join(''); // Remove os dois pontos da string
            return horaA.localeCompare(horaB); // Compara as horas formatadas
          });
          console.log('Agendamentos do dia:', this.agendamentosDia[this.iteradorA]); // Adicionado este log para verificar se os dados estão sendo atribuídos corretamente
          this.iteradorA++;
        }

        console.log('Agendamentos da semana:', this.agendamentosDia);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }

  }



  pegaEspecialistas() {
    this.app.getEspecialistas({espID: this.dadoAgendamento.value.especialidade}, this.httpOptions)
    .subscribe({
      next: ((res:any)=> {
        console.log(this.dadoAgendamento.value.especialidade);
        this.especialistas = res;
        console.log(this.especialistas);
      }),
      error: ((err:any)=> {
        console.log(err.message);
      })
    })
  }

  pegaRealizadores() {
    this.app.getRealizadores({exmID: this.dadoAgendamento.value.especialidade}, this.httpOptions)
    .subscribe({
      next: ((res:any)=> {
        console.log(this.dadoAgendamento.value.exame);
        this.especialistas = res;
        console.log(this.especialistas);
      }),
      error: ((err:any)=> {
        console.log(err.message);
      })
    })
  }

  collapseAtend () {
    this.animalDates = null;
    this.succes = null;
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
    this.dadoAgenda = false;
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
        data: this.formatDateAg(this.dadoAgendamento.value.dataHora),
        horario: this.formatHour(this.dadoAgendamento.value.dataHora),
        pedido: this.dadoAgendamento.value.pedido,
        conclusao: 'Agendado',
        tipo: this.dadoAgendamento.value.tipo,
        rga: this.animalDates.ani_id,
        veterinário: this.dadoAgendamento.value.veterinario,
        descTipo: String(this.dadoAgendamento.value.especialidade),
        triagem: this.dadoAgendamento.value.triagem
      },
      this.httpOptions
    ).subscribe({
      next: ((res)=>{
        console.log(this.dadoAgendamento.value.especialidade);
        this.succes = res.message;
        this.atualizaAgenda();
      }),
      error: ((err)=>{
        console.log(this.animalDates)
        console.log(err)
      })
    })
  }

  atuaalizaAgenda() {
    this.app.atualizaAgenda(
      {
        data: this.formatDateAg(this.dadoAgendamento.value.dataHora),
        horario: this.formatHour(this.dadoAgendamento.value.dataHora),
        pedido: this.dadoAgendamento.value.pedido,
        tipo: this.dadoAgendamento.value.tipo,
        descricao: String(this.dadoAgendamento.value.especialidade),
        vetID: this.dadoAgendamento.value.veterinario,
        agdID: this.dadosGerais.id
      },
      this.httpOptions
    ).subscribe({
      next: ((res)=>{
        this.succes = res.message;
        this.atualizaAgenda();
      }),
      error: ((err)=>{
        console.log(err)
      })
    })
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

  public async pegaDadosAgendamento(
    animalID: number,
    tipoConsulta: string,
    mv: string,
    data: any,
    horario: any,
    id: number,
    conclusao: string
  ) {
    this.dadoAgenda = true;
    this.dadosGerais = {
      tipo: tipoConsulta,
      mv: mv,
      data: data,
      horario: horario,
      id: id,
      conclusao: conclusao
    }
    this.animalApp.consultaAnimais({
      rga: animalID
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

  public async validaAgendamento (id: number) {
      this.app.validaAgenda({agdID: id},this.httpOptions).subscribe({
        next: (async (res)=> {
          this.dadosGerais = null;
          this.atualizaAgenda();
         return res
        }),
        error: ((err)=> {
          console.log(err);
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

  async agenda () : Promise<any> {
    try {
      const res = await this.app.pgaAgenda({ data: this.dia }, this.httpOptions).toPromise();
      console.log('Resposta da agenda:', res); // Adicionado este log para verificar a resposta do servidor
      this.marcador = res;
      console.log('Marcador:', this.marcador); // Adicionado este log para verificar se 'this.marcador' está sendo atribuído corretamente
      return this.marcador; // Retorna os dados recebidos do servidor
    } catch (error) {
      console.error("Erro ao obter dados da agenda:", error);
      throw error; // Lança o erro para que possa ser tratado no método ngOnInit()
    }
  }

  async agendaEsp () : Promise<any> {
    if (this.dadoBusca.value.tipo == 'Tipo Atendimento') {
      this.busca = 'agd_tipo';
    } else {
      this.busca = 'agd_veterinario_vet_id';
    }
    try {
      const res = await this.app.getAgendaEspecial({ dia: this.dia, tipo: this.busca, referencia: this.dadoBusca.value.referencia}, this.httpOptions).toPromise();
      console.log('Resposta da agenda:', res); // Adicionado este log para verificar a resposta do servidor
      this.marcador = res;
      console.log('Marcador:', this.marcador); // Adicionado este log para verificar se 'this.marcador' está sendo atribuído corretamente
      return this.marcador; // Retorna os dados recebidos do servidor
    } catch (error) {
      console.error("Erro ao obter dados da agenda:", error);
      throw error; // Lança o erro para que possa ser tratado no método ngOnInit()
    }
  }


  async ordenaHorarios(array: any[]) {
    array.sort((a: any, b: any) => {
      const horaA = new Date(a.agd_horario).getTime(); // Obtém o tempo em milissegundos do horário do agendamento 'a'
      const horaB = new Date(b.agd_horario).getTime(); // Obtém o tempo em milissegundos do horário do agendamento 'b'
      return horaA - horaB; // Compara os horários e retorna o resultado da comparação
    });
  }

  async pegaEspecialidades () {

      this.app.getEspecialidades(this.httpOptions).subscribe({
        next: ((res)=> {
          this.especialidades = res;
          console.log(`Especialidades: ${this.especialidades}`)
          return this.especialidades
        }),
        error: ((err)=> console.log(err))

    })
  };

  async pegaExames () {

    this.app.getExames(this.httpOptions).subscribe({
      next: ((res)=> {
        this.exames = res;
        console.log(`Exames: ${this.exames}`);
        return this.exames
      }),
      error: ((err)=> console.log(err))

  })
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


  async pegaSemana() {
    console.log(`Iterador da semana ${this.iterador}`)
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


  semaninhaArray.shift();
  semaninhaArray.pop();
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

formatDateAg(dateString:any) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

formatHour(hour:any) {
  console.log(hour)
  const hora = String(new Date(hour).getHours()).padStart(2, '0');
  console.log(hora);
  const minutos = String(new Date(hour).getMinutes()).padStart(2, '0');
  return `${hora}:${minutos}`
}

formataHora (hora:any) {
  return hora.slice(0, -3);
}

async somaIterador () {

    this.dadosArray.splice(0, this.dadosArray.length);

    this.iterador += 7;

    console.log('talvez'+this.iterador);

    await this.pegaSemana();

    try {
      await this.atualizaAgenda();
    } catch (err) {
      console.log(err);
    }

}




async diminuiIterador () {

  this.dadosArray.splice(0, this.dadosArray.length);

  try {
    this.iterador -=7;
    console.log(`Iterados do menos: ${this.iterador}`)

    await this.pegaSemana();
    console.log('Message'+this.outra);

  console.log(this.iterador)
    try {
      await this.atualizaAgenda();
    } catch (err) {
      console.log(err);
    }

  } catch (err) {
    console.log(err);
  }


}

}
