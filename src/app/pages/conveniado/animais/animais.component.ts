import { Component, OnInit } from '@angular/core';
import { AnimaisAppService } from 'src/app/services/animais-app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})
export class AnimaisComponent implements OnInit {
  userDates = JSON.parse(localStorage.getItem('userDates') ?? '{}');
  clientId: any
  msgError: any;
  msgErrorDois:any;
  animais: any;
  felina: boolean = false;
  canina: boolean = false;

  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`
  });

  httpOptions = {
    headers: this.headers
  };



  constructor( private animalApp: AnimaisAppService) {
   }

  ngOnInit(): void {
    this.clientId = this.userDates.id;
    this.consultaAnimais();
    this.animais = this.animalApp.dadosAnimais;
  }

  public async consultaAnimais() {
      this.animalApp.consultaAnimais({
       rga: this.animais.value.rga
      }, this.httpOptions)
      .subscribe ({
        next: ((res)=> {
        }),
        error: ((err)=> {
          this.msgError = err;
          this.msgErrorDois = "Dirija-se Até uma das unidades, junto ao seu pet, para realizar o cadastro.";})
      })
  }

  enviarID (id:any, nome:any, especie:any, raca:any, cor:any, sexo:any, idade:any, particularidades:any, microchip:any, urlfoto:any, urlqrcode:any) {
    localStorage.setItem('animalDates', JSON.stringify({
      id: id,
      nome: nome,
      raca: raca,
      especie: especie,
      cor: cor,
      sexo: sexo,
      idade: idade,
      particularidades: particularidades,
      microchip: microchip,
      urlfoto: urlfoto,
      urlqrcode: urlqrcode
    }))
  }

}

