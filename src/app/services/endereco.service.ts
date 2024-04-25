import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

 acesso:string = 'https://viacep.com.br/ws/';



  constructor(private http: HttpClient) { }


  public pegaEndereco (cep:any): Observable<any> {
    return this.http.get(`${this.acesso}${cep}/json/`).
    pipe (
      map((response)=> {
        return response;
      }),
     catchError((error)=> {
      return throwError(() => "Cep inválido", error.error);
     })
    )
  }
}
