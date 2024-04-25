import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonAppService } from 'src/app/services/common-app.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-ponto-virtual',
  templateUrl: './ponto-virtual.component.html',
  styleUrls: ['./ponto-virtual.component.css']
})
export class PontoVirtualComponent implements OnInit {

  coordenadas: any;
  localizacao: any;

  constructor(private app: CommonAppService, private admApp: FuncionarioService) { }

  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`
  });

  httpOptions = {
    headers: this.headers
  };

  localiza(): Promise<{ latitude: number, longitude: number }> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const coordenadas = {
            latitude: latitude,
            longitude: longitude
          };

          resolve(coordenadas);
        }, error => {
          reject(new Error('Erro ao obter a localização: ' + error.message));
        });
      } else {
        reject(new Error('Geolocalização não suportada pelo navegador'));
      }
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.coordenadas = await this.localiza();
      console.log(this.coordenadas);
      try {
        this.localizacao = await this.retornaLocalizacao();
        console.log(this.localizacao);
      } catch (err) {
        console.log(err);
      }
    } catch (error: any) {
      console.error(error.message);
    }



  }

  retornaLocalizacao(): Promise <any> {
    return new Promise ((resolve, reject) => {
      try {
        this.admApp.pegaLocalizacao({
          latitude: this.coordenadas.latitude,
          longitude: this.coordenadas.longitude
        })
        .subscribe({
          next: ((res)=> {

            resolve(res);
          }),
          error: (err) => console.error(err)
        });
      } catch (err: any) {
        reject(err);
      }
    })
  }

  retornaDiaHora() {
    const data = new Date();
    const dia = String(data.getUTCDate()).padStart(2,'0')
    const mes = String(data.getUTCMonth()+1).padStart(2,'0')
    const ano = data.getFullYear();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    const segundos = data.getSeconds();

    return `${dia}/${mes}/${ano} às ${hora}:${minutos} e ${segundos}s`
  }




}
