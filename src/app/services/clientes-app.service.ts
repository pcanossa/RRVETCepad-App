import { Injectable } from '@angular/core';
import { CommonAppService } from './common-app.service';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientesAppService {

  private auth: string = '/auth';
  private new: string = '/novoAcesso';
  private mail: string = '/perdeuSenha';
  private recuperaSenha: string = '/registraNovaSenha';
  isAuthenticated = false;

  novaSenha = {
    codigoAcesso: '',

    pegaCodigo (codigo:string) {
      this.codigoAcesso = codigo;
    }
  }

  login = {
    cli_id: 0,
    cli_nome: "",

    makeLogin(id:number, nome:string) {
      this.cli_id = id;
      this.cli_nome = nome
    }

  }

  dadosPrimeiroAcesso = {
    cpf: "",
    novaSenha: "",
    senha: "",

    consultaCPF(cpf:string, novaSenha:string, senha:string) {
      this.cpf = cpf;
      this.novaSenha = novaSenha;
      this.senha = senha;
    }

  }

  constructor(private app: CommonAppService,
    private httpClient: HttpClient) {
  }

  public authService (payload: {cpf: any, senha: any}): Observable<any> {
    return this.httpClient.post(this.app.url+this.auth, payload).pipe(
      map((response: any) => {
        console.log(response);
        this.login.makeLogin(response.user.cli_id, response.user.cli_nome);
        console.log(this.login);
        this.isAuthenticated=true;
        localStorage.setItem('isAuthenticated', JSON.stringify('true'));
        localStorage.setItem('token', JSON.stringify(response.user.token));
        return response
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
        console.log(this.dadosPrimeiroAcesso)
        return response.message;
      }),
      catchError((e) => {
        if (e.error.message) {
          return throwError(() => e.error.message)};

        return throwError (() => "Não foi possível concluir a ação, tente mais tarde")
      })
    )
  }

  public enviaEmail(payload: {cpf: string}): Observable<any> {
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

  public registraNovaSenha(payload: {cpf: string, senha: string}): Observable<any> {
    return this.httpClient.post(this.app.url+this.recuperaSenha, payload).pipe(
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





}
