import { Injectable } from '@angular/core';
import { CommonAppService } from './common-app.service';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private auth: string = '/auth';
  private new: string = '/novoAcesso';
  private cadastro: string = '/novoUser';
  private tutores: string = '/novoTutor';
  private alteraTutor: string = '/alteraTutor';
  private alteraAnimal: string = '/alteraAnimal';
  private realizaAgendamento: string = '/agendamento';
  private vets: string = '/vets';
  private validaAgendamento: string = '/validaAgenda';
  private atualizaAgendamento: string = '/atualizaAgenda';
  private getExms: string = '/getExames';
  private realizadores: string = '/getRealizadores';
  private especialistas: string = '/getEspecialistas';
  private getEspecalidades: string = '/getEspecialidades';
  private getAgenda: string = '/getAgenda';
  private getAtendimentoPorVets: string = '/gatAtdsVets';
  private getAgendAEsp: string = '/AgendaEsp';
  private getAgendamento: string = '/verificaAgendamento';
  private getColaborador: string = '/colaborador';
  private getEspecialidadeVeto: string = '/especialidadeVet';
  private getAtendimentos: string = '/atendimentosAnteriores';
  private getAgendaExm: string = '/AgendaExm';
  private getProcedimentos = '/procedimentos';
  private getAnexos = '/getAnexos';
  private updateAplicacoes: string = '/registraAplicacao';
  private getVetAtendimento: string = '/vetAtendimento';
  private validaVeterinario: string = '/validaVet';
  private getAtendimentosVet: string = '/atendimentoVet';
  private cadastroColaborador: string = '/cadastroColaborador';
  private recuperaSenha: string = '/registraNovaSenhaCol';
  private mail: string = '/perdeuSenhaCol';
  private pln: string = '/prd';
  private col: string = '/cols';
  private cli: string = '/tutores';
  private foto: string = '/uploadImage';
  private animal: string = '/novoAnimal';
  private bcFoto: string = '/sendUrl';
  private count: string = '/calc';
  private ponto: string = '/gps';
  private agenda: string ='/consultaSemana';
  private cart: string = '/consultaCart';
  private validaCons: string = '/valida';
  private desmarcaAgd: string = '/desmarca';
  private consultaAgdAnimal: string = '/consultaAgd';
  private validado: string = '/validados';
  private filaAplicacoes: string = '/filaAplicacoes';
  private vet: string ='/consultaVet';
  private listExames: string = '/filaExames';
  private indices: string = '/listaMedic'
  private lyAuth = environment.apiTokenUrl;
  private lyClient = environment.apiClient;
  private lySecret = environment.apiSecret;
  private lyInvoice = environment.apiInvoice;
  private lyInstallment = environment.apiInstallment;
  private lyCancel = environment.apiCancel;
  private regAtend: string = '/regAtend';
  private iniciaAtend: string = '/iniciaAtendimento';
  private byNome: string = '/getNome';
  private users = '/user';
  private atendId: string = '/atendID';
  private atend: string = '/novoAtendimento';
  private retorno: string = '/retorno';
  private anMedica: string = '/anMedica';
  private anAlimentar: string = '/anAlimentar';
  private anPreventiva: string = '/anPreventivos';
  private anSuplementar: string = '/anSuplementar';
  private anOutros: string = '/anOutros';
  private adicionaAnteriores: string = '/adicionaAnteriores';
  private adicionaSuspeita: string = '/adicionaSuspeita';
  private receita: string = '/receita';
  private aplicacao: string = '/aplicacao';
  private vacina: string = '/vacina';
  private exame: string = '/exame';
  private encEspecialista: string = '/encEspecialista';
  private encCirurgia: string = '/encCirurgia';
  private faturas: string = environment.apiFaturamentos;
  private parceiros: string = '/consultaParceiros';
  private vendaParceiro: string = '/contabilizaVenda';
  private vendas: string = '/vendas';
  isAuthenticated = false;

  constructor( private app: CommonAppService, private httpClient: HttpClient) { }

  public authService (payload: {cpf: any, senha: any}): Observable<any> {
    return this.httpClient.post(this.app.url+this.auth, payload).pipe(
      map((response: any) => {
        this.isAuthenticated=true;
        console.log(response);
        localStorage.setItem('funcDates', JSON.stringify({ id: response.user[0].usr_colaborador_col_id, idVet: response.user[0].col_id, nivelAcesso: response.user[0].col_funcao_cfn_id}))
        localStorage.setItem('isADMAuthenticated', JSON.stringify('true'));
        localStorage.setItem('token', JSON.stringify(response.token));
        }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public primeroAcesso(payload: {cpf: string, senha: string, novaSenha:string}): Observable<any> {
    return this.httpClient.post(this.app.url+this.new, payload).pipe(
      map((response:any)=> {
        return response.message;
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public getAtendimentosForVets (payload: {id: string, dataInicial: any, dataFinal:any}, header: any): Observable<any> {
    return this.httpClient.post(this.app.url+this.getAtendimentoPorVets, payload, header).pipe(
      map((response:any)=> {
        return response;
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }


  public enviaEmailCol (payload: {cpf: string}): Observable<any> {
    return this.httpClient.post(this.app.url+this.mail, payload).pipe(
    map((response:any)=> {
        console.log(response);
        return response.codigoVerificador;
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public pegaAnexos (payload: {id: number}, header:any): Observable<any> {
    return this.httpClient.post(this.app.url+this.getAnexos, payload, header).pipe(
    map((response:any)=> {
        console.log(response);
        return response;
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public registraAplicacoes (payload: {array: any, id: number}, header:any): Observable<any> {
    return this.httpClient.post(this.app.url+this.updateAplicacoes, payload, header).pipe(
    map((response:any)=> {
        console.log(response);
        return response;
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }


  public pegaAplicacoes (header:any): Observable<any> {
    return this.httpClient.get(this.app.url+this.filaAplicacoes, header).pipe(
    map((response:any)=> {
        console.log(response);
        return response;
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }


  public colaborador (payload: {id: any}, header: any): Observable<any> {
    return this.httpClient.post(this.app.url+this.getColaborador, payload, header).pipe(
    map((response:any)=> {
        return response;
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  };

  public pegaEspecialidadeVet(payload: {vetId: any}, header: any): Observable<any> {
    return this.httpClient.post(this.app.url+this.getEspecialidadeVeto, payload, header).pipe(
      map((response:any)=> {
          return response;
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
        })
      )
  }

  pegaAtendimentos(payload: { idAnimal: any }, header: any): Observable<any> {
    return this.httpClient.post(this.app.url + this.getAtendimentos, payload, header).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message);
        }
        return throwError(() => "Não foi possível concluir a ação, tente mais tarde");
      })
    );
  }

  public pegaProcedimentos (headers: any) {
    return this.httpClient.get(this.app.url+this.getProcedimentos, headers).pipe(
      map((response:any)=> {
          console.log(response);
          return response;
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
        })
      )
  }

  public registraCliente (payload: {
    nome: string,
    cpf: string,
    cep: string,
    rua: string,
    bairro:string,
    numero: number,
    cidade: string,
    estado: string,
    data_nascimento: string,
    telefone: string,
    tipo: string,
  }, header:any): Observable<any> {
    return this.httpClient.post(this.app.url+this.tutores, payload, header).pipe(
      map((response)=> {
        return response
      }),
      catchError((error)=> {
        if (error.error.message) {
          return throwError(() => error.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  };

  public pegaAgendamento (payload: {id: any}, header: any): Observable<any> {
    return this.httpClient.post(this.app.url+this.getAgendamento, payload, header).pipe(
      map((response)=> {
        return response
      }),
      catchError((error)=> {
        if (error) {
          return throwError(() => error)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public alteraTut(payload: {
    nome: string,
    cpf: string,
    cep: string,
    rua: string,
    bairro:string,
    numero: number,
    cidade: string,
    estado: string,
    telefone: string,
    tipo: string,
    id: number
  }, header:any): Observable<any> {
    return this.httpClient.post(this.app.url+this.alteraTutor, payload, header).pipe(
      map((response)=> {
        return response
      }),
      catchError((error)=> {
        if (error.error.message) {
          return throwError(() => error.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  };

  public altAnimal (payload: {
    nome: string,
    especie: string,
    raca: string,
    cor: string,
    sexo: string,
    rga: string,
    particularidade: string,
    porte: string
  }, header:any) {
    return this.httpClient.post(this.app.url+this.alteraAnimal, payload, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )

  }

  public getAgendaEspecial (payload: {
    dia: any,
    tipo: string,
    referencia: string,
  }, header:any) {
    return this.httpClient.post(this.app.url+this.getAgendAEsp, payload, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )

  }

  public getVetResponsavel (payload: {id: any}, header:any) {
    return this.httpClient.post(this.app.url+this.getVetAtendimento, payload, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public getAtdVet (payload: {
    id: any
  }, header:any) {
    return this.httpClient.post(this.app.url+this.getAtendimentosVet, payload, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )

  }



  public registraColaborador (payload: {
    nome: string,
    cpf: string,
    cep: string,
    rua: string,
    bairro:string,
    numero: number,
    cidade: string,
    telefone: string,
    email: string,
  }, header: any): Observable<any> {
    return this.httpClient.post(this.app.url+this.cadastroColaborador, payload, header).pipe(
      map((response)=> {
        return response
      }),
      catchError((error)=> {
        if (error.error.message) {
          return throwError(() => error.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public getVets(header:any): Observable<any> {
    return this.httpClient.get(this.app.url+this.vets, header).pipe(
      map((response)=> {
        return response
      }),
      catchError((error)=> {
        if (error.error.message) {
          return throwError(() => error.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  };

  public validaVet (payload: {id: number}, header:any): Observable<any> {
    return this.httpClient.post(this.app.url+this.validaVeterinario, payload, header).pipe(
      map((response)=> {
        return response
      }),
      catchError((error)=> {
        if (error.error.message) {
          return throwError(() => error.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  };



  public getEspecialidades(header:any): Observable<any> {
    return this.httpClient.get(this.app.url+this.getEspecalidades, header).pipe(
      map((response)=> {
        return response
      }),
      catchError((error)=> {
        if (error.error.message) {
          return throwError(() => error.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  };

  public getExames(header:any): Observable<any> {
    return this.httpClient.get(this.app.url+this.getExms, header).pipe(
      map((response)=> {
        return response
      }),
      catchError((error)=> {
        if (error.error.message) {
          return throwError(() => error.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  };


  public pgaAgenda(payload: {data: any}, header:any) : Observable<any> {
    return this.httpClient.post(this.app.url+this.getAgenda, payload, header).pipe (
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
   }

   public validaAgenda (payload: {agdID: any,entrada: any}, header:any) : Observable<any> {
    return this.httpClient.post(this.app.url+this.validaAgendamento, payload, header).pipe (
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
   }

   public atualizaAgenda (payload: {
    data: any,
    horario: any,
    pedido: any,
    tipo: any,
    descricao: any,
    vetID: number,
    agdID: number,
  }, header:any) : Observable<any> {
    return this.httpClient.post(this.app.url+this.atualizaAgendamento, payload, header).pipe (
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
   }

  public registraNovaSenha(payload: {cpf: string, senha: string}): Observable<any> {
    return this.httpClient.post(this.app.url+this.recuperaSenha, payload).pipe(
      map((response:any)=> {
        return response;
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public consultaColaborador (header:any): Observable<any> {
    return this.httpClient.get(this.app.url+this.col, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public agendaNovo (payload: {
    data: any,
    horario: any,
    pedido: any,
    conclusao: any,
    tipo: any,
    rga: number,
    veterinário: number,
    descTipo: any,
    triagem: any
  }, header:any): Observable<any> {
    return this.httpClient.post(this.app.url+this.realizaAgendamento, payload, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })

    );
  }



  public consultaPlanos (header:any): Observable<any> {
    return this.httpClient.get(this.app.url+this.pln, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public consultaCli (payload: {cpf:string}, header:any): Observable<any> {
    return this.httpClient.post(this.app.url+this.cli, payload, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public enviaFoto (foto: FormData, header:any): Observable<any> {
    return this.httpClient.post(this.app.url+this.foto, foto, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public bcEnvFoto (payload: {path: any, id: any}, header:any): Observable<any> {
    return this.httpClient.post(this.app.url+this.bcFoto, payload, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public cadastraAnimal (payload: {
    nome: string,
    especie: string,
    raca: string,
    cor: string,
    sexo: string,
    nascimento: string,
    rga: string,
    particularidade: string,
    tutorId: number,
    porte: string
  }, header:any) {
    return this.httpClient.post(this.app.url+this.animal, payload, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )

  }

  public async getCount(header:any) {

        return this.httpClient.get(this.app.url+this.count, header).pipe(
          map((response:any)=> {
           return response
          }),
          catchError((e) => {
            if (e.error.message) {
              return e.error.message;
            }

            return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
          })
        )
  }

  public pegaLocalizacao (payload: {latitude: any, longitude: any}): Observable<any> {
    return this.httpClient.post(this.app.url+this.ponto, payload).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public retornaSemana (payload: {iterador:number, unidade:string}, headers: any): Observable<any> {
    return this.httpClient.post(this.app.url+this.agenda, payload, headers).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public getEspecialistas (payload: {espID:number}, headers: any): Observable<any> {
    return this.httpClient.post(this.app.url+this.especialistas, payload, headers).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public getRealizadores (payload: {exmID:number}, headers: any): Observable<any> {
    return this.httpClient.post(this.app.url+this.realizadores, payload, headers).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public consultaCarteirinha (payload: {numCart: string}, header: any): Observable<any> {
    return this.httpClient.post(this.app.url+this.cart, payload, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public valida (payload: {idCart: number}, header: any): Observable<any> {
    return this.httpClient.post(this.app.url+this.validaCons, payload, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public desmarca (payload: {idAgd: number, tipo: string}, header: any): Observable<any> {
    return this.httpClient.post(this.app.url+this.desmarcaAgd, payload, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public conultaAgdAnimal (payload: {aniId: number}, header: any): Observable<any> {
    return this.httpClient.post(this.app.url+this.consultaAgdAnimal, payload, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public consultaValidados(header: any): Observable<any> {
    return this.httpClient.get(this.app.url+this.validado, header).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public consultaVet (payload: {codFunc:string}, header: any): Observable<any> {
    return this.httpClient.post(this.app.url+this.vet, payload, header).
    pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public filaExames (headers: any) : Observable<any> {
    return this.httpClient.get(this.app.url+this.listExames, headers).
    pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public buscaIndiceAutoComplete (headers: any): Observable<any> {
    return this.httpClient.get(this.app.url+this.indices, headers).
    pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public catchToken(): Observable<any> {
    return this.httpClient.post(this.lyAuth, {
      grantType: 'clientCredentials',
      clientId: this.lyClient,
      clientSecret: this.lySecret,
      scopes: [
        "product",
          "client",
          "billingRule",
          "paymentLink",
          "invoice",
          "subscription",
          "installment"
      ]
    }).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  };

  public invoices(payload: {}, token: any): Observable<any> {
      return this.httpClient.post(this.lyInvoice, payload, token
    ).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

      })
    )
    };

    public faturaPessoa(cpf: string , token: any): Observable<any> {
      return this.httpClient.get(this.faturas+cpf, token
    ).pipe(
      map((response:any)=> {
        return response;
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

      })
    )
    }

    public cancelParcels(id: string , token: any): Observable<any> {
      return this.httpClient.get(this.cancelParcels+id, token
    ).pipe(
      map((response:any)=> {
        return response;
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

      })
    )
    }

    public installment(payload: {}, token: any): Observable<any> {
      return this.httpClient.post(this.lyInstallment, payload, token
    ).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

      })
    )
    }

    public installmentDates(token: any): Observable<any> {
      return this.httpClient.get(this.lyInstallment, token
    ).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

      })
    )
    }

    public installmentPage(token: any, status: string): Observable<any> {
      return this.httpClient.get(`${this.lyInstallment}?status=${status}`, token
    ).pipe(
      map((response:any)=> {
        return response
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

      })
    )
    }

    public regitraAtend(payload: {
      atdId: number,
      temperatura: string,
      mucosas: string,
      respiratorio: string,
      cardiaco: string,
      ausResp: string,
      ausCard: string,
      linfonodos: string,
      pa: string,
      peso: string,
      anamnese: string,
      sisteResp: string,
      sistOrtopedico: string,
      sistCardiovascular: string,
      sistEndocrino: string,
      sistGastrointestinal: string,
      sistUrinario: string,
      sistReprodutivo: string,
      dermatologico: string,
      oftalmico: string,
      odontologico: string
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.regAtend, payload, headers).pipe(
          map((response:any)=> {
            return response
          }),
          catchError((e) => {
            if (e.error.message) {
              return throwError(() => e.error.message)};

            return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

          })
        )
    }

    public iniciaAtendimento(payload: {
      dataHora: string,
      aniId: number,
      vetId: number
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.iniciaAtend, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    }


    public getUsers (headers: any) {
      return this.httpClient.get(this.app.url+this.users, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public getNome(payload: {
      nome: string,
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.byNome, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    }

    public getAtendId(payload: {
      id:number,
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.atendId, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraDadosAtendimento(payload: {
      atdId: number,
      temperatura: string,
      mucosas: string,
      respiratorio: string,
      cardiaco: string,
      ausResp: string,
      ausCard: string,
      linfonodos: string,
      pa: string,
      peso: string,
      sistResp: string,
      sistOrtopedico: string,
      sistCardiovascular: string,
      sistEndocrino: string,
      sistGastrointestinal: string,
      sisteUrinario: string,
      sistReprodutivo: string,
      dermatologico: string,
      oftalmico: string,
      odontologico: string,
      neurologico: string
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.atend, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraRetorno(payload: {
      atdId: number,
      evolucao: string,
      detalhes: string
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.retorno, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraAnMedica(payload: {
      adtId: number,
      acesso:string,
      ingestaoHidrica: string,
      agua: string,
      diurese: string,
      urina: string,
      freqUrina: string,
      pesoCorporal: string,
      escore: string,
      prurido: string,
      freqPrurido: string,
      inicioPrurido: string,
      localPrurido: string,
      vomito: string,
      freqVomito: string,
      inicioVomito: string,
      regurgitacao: string,
      freqRegurgitacao: string,
      inicioRegurgitacao: string,
      comportamento: string,
      tipoComportamento: string,
      inicioComportamento: string,
      sono: string,
      vocalizacao: string,
      periodoVocalizacao: string,
      inicioVocalizacao: string,
      sincope: string,
      inicioSincope: string,
      momentoSincope: string,
      freqSincope: string,
      incoordencao: string,
      inicioIncoordencao: string,
      momentoIncoordenacao: string,
      tosse: string,
      freqTosse: string,
      inicioTosse: string,
      epiletica: string,
      freqEpiletica: string,
      inicioEpiletica: string,
      momentoEpiletica: string,
      lambedura: string,
      freqLambedura: string,
      inicioLambedura: string,
      momentoLambedura: string,
      carrapatos: string,
      pulgas: string,
      vermes: string,
      outros: string,
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.anMedica, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraAnAlimentar(payload: {
      atdId: number,
      tipo: string,
      adquirido: string,
      freqOfertada: string,
      duracao: string,
      motivoComida: string,
      aspectoFezes: string,
      freqFezes: string
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.anAlimentar, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraAnPreventivos(payload: {
      atdId: number,
      antirabica: string,
      polivalente: string,
      castracao: string,
      recusa: string,
      vermifugacao: string,
      ectoparasiticida: string,
      tipoParasiticida: string
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.anPreventiva, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraAnSuplementar(payload: {
      atdId: number,
      suplemento: string,
      motivo: string,
      inicio: string
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.anSuplementar, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraAnOutros(payload: {
      atdId: number,
      petisco: string,
      frequencia: string,
      inicio: string
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.anOutros, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraAnteriores(payload: {
      atdId: number,
      doenca: string
      }, headers: any) {
      return this.httpClient.post(this.app.url+this.adicionaAnteriores, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraSuspeitas(payload: {
      atdId: number,
      doenca: string
      }, headers: any) {
      return this.httpClient.post(this.app.url+this.adicionaSuspeita, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraReceita (payload: {
      medic: string,
      apresentacao: string,
      concentracao: string,
      atdId: number,
      frequencia: string,
      duracao: string,
      quantidade: string,
      }, headers: any) {
      return this.httpClient.post(this.app.url+this.receita, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraAplicaco (payload: {
      medic: string,
      apresentacao: string,
      concentracao: string,
      atdId: number,
      via: string,
      quantidade: string,
      }, headers: any) {
      return this.httpClient.post(this.app.url+this.aplicacao, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraVacina (payload: {
      vacina: string,
      marca: string,
      animalId: number,
      vetId: number,
      vencimento: string,
      lote: string,
      reforco: string,
      data: string
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.vacina, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraExame (payload: {
      data: string;
      exame: string,
      amostra: string,
      citotlogia: string
      atdId: number,
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.exame, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraencEspecialista (payload: {
      especialista: string,
      atdID: number
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.encEspecialista, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public registraencencCirurgia (payload: {
      cirurgia: string,
      data: string,
      atdID: number,
    }, headers: any) {
      return this.httpClient.post(this.app.url+this.encCirurgia, payload, headers).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")

        })
      )
    };

    public consultaParceiros (): Observable<any> {
      return this.httpClient.get(this.app.url+this.parceiros).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
        })
      )
    };

    public consultaVendas (header:any): Observable<any> {
      return this.httpClient.get(this.app.url+this.vendas, header).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
        })
      )
    };

    public contabilizaVendaParceiro (payload: {
      qntdadePlano: number,
      valorUnitario: number,
      valorTotal: number,
      idCliente: number,
      idVendedor: number
    }): Observable<any> {
      return this.httpClient.post(this.app.url+this.vendaParceiro, payload).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e) => {
          if (e.error.message) {
            return throwError(() => e.error.message)};

          return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
        })
      )
    }





  }








