import { Injectable } from '@angular/core';
import { CommonAppService } from './common-app.service';
import { HttpClient} from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AnimaisAppService {

  private animais: string = '/buscaAnimal';
  private cart: string = '/carteirinha';
  private vacinas: string = '/vacinas';
  private atendimentos = '/atendimento';
  private anexos = '/anexos';
  private agenda = '/agendaD'
  private extra = '/agendaExtra';
  private agendamento: string = '/marcaAgenda';
  dadosAnimais: any [] = [];



  animalDates = {
    ani_id: 0,
    ani_nome: "",
    ani_especie: "",
    ani_sexo: "",
    ani_raca: "",
    ani_cor: "",
    ani_nascimento: "",
    ani_particularidades: "",
    ani_rga: "",
    ani_porte: "",
    ani_urlfoto: "",
    ani_tutor_cli_id: 0,

    pegaDadosAnimal (
      id: number,
      nome:string,
      especie:string,
      sexo:string,
      raca:string,
      cor:string,
      nascimento:string,
      particularidades:string,
      rga:string,
      porte:string,
      urlfoto:string,
      tutor_id:number) {
        this.ani_id = id;
        this.ani_nome = nome;
        this.ani_especie = especie,
        this.ani_cor = cor,
        this.ani_raca = raca,
        this.ani_sexo = sexo,
        this.ani_rga = rga,
        this.ani_porte = porte,
        this.ani_urlfoto = urlfoto,
        this.ani_particularidades = particularidades,
        this.ani_nascimento = nascimento,
        this.ani_tutor_cli_id = tutor_id
      }

  };



  constructor(private app: CommonAppService,
    private httpClient: HttpClient) {
     }



    public consultaAnimais (payload: {rga: any}, headers:any): Observable<any> {
      return this.httpClient.post(this.app.url+this.animais, payload, headers).pipe(
        map((response: any) => {

          return response;
          }),
          catchError((error)=> {
            if (error.error.message) {
              return throwError(() => error.error.message)};

            return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
          })
      )
    }

    public consultaCarteirinha (payload: {id: any}, header:any): Observable<any> {
      return this.httpClient.post(this.app.url+this.cart, payload, header).pipe(
        map((response: any) => {
          return response
          }),
        catchError((e)=> {
          return throwError(()=> 'Naõ foi possível realizar essa ação, tente mais tarde')
        })
      )
    }

    public consultaVacinas (payload: {id: any}, header:any): Observable<any> {
      return this.httpClient.post(this.app.url+this.vacinas, payload, header).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e)=> {
          return throwError(()=> 'Não foi possível realizar essa ação, tente mais tarde')
        })
      )
    }

    public consultaAtendimentos (payload: {id: any}, header:any): Observable<any> {
      return this.httpClient.post(this.app.url+this.atendimentos, payload, header).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e)=> {
          return throwError(()=> 'Não foi possível realizar essa ação, tente mais tarde')
        })
      )
    }

    public consultaAnexos (payload: {id: any}, header:any): Observable<any> {
      return this.httpClient.post(this.app.url+this.anexos, payload, header).pipe(
        map((response:any)=> {
          return response
        }),
        catchError((e)=> {
          return throwError(()=> 'Não foi possível realizar essa ação, tente mais tarde')
        })
      )
    }

    public consultaAgenda(payload: {unidade: string, dataInicial: string, dataFinal: string}, header:any): Observable<any> {
      return this.httpClient.post(this.app.url+this.agenda, payload, header)
        .pipe(
          map((response: any) => {
            return response;
          }),
          catchError((e) => {
            return throwError(() => 'Não foi possível realizar essa ação, tente mais tarde');
          })
        )
    }

    public realizaAgebdamento(payload: {idDia: any, idAnimal: any, tipo: string, status: string}, headers: any): Observable<any> {
      return this.httpClient.post(this.app.url+this.agendamento, payload, headers)
      .pipe(
        map((response: any) => {
        return response;
        }),
        catchError((e) => {
          return throwError(() => 'Não foi possível realizar essa ação, tente mais tarde');
        })
      );
    }

    public realizaAgendamentoExttra (payload: {animalId: any,  tipo: string, diaHora: any, unidade: string}, headers: any): Observable<any> {
      return this.httpClient.post(this.app.url+this.extra, payload, headers)
      .pipe(
        map((response: any) => {
        return response;
        }),
        catchError((e) => {
          return throwError(() => 'Não foi possível realizar essa ação, tente mais tarde');
        })
      );
    }


}
