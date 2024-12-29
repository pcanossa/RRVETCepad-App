import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonAppService {

 url: string = 'https://vsystem.cloud:3000'

  constructor() { }

  async localiza() {
      // Verifique se o navegador suporta a Geolocation API
    if ('geolocation' in navigator) {
      await navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const coordenadas = {
          latitude: latitude,
          longitude: longitude
        };

        return {latitue: latitude, longitude: longitude};

        // Envie a latitude e longitude para o servidor
        // Você pode fazer uma requisição HTTP para o seu servidor Node.js
      }, error => {
        console.error('Erro ao obter a localização:', error.message);
      });
    } else {
      console.error('Geolocalização não suportada pelo navegador');
    }

  }


}
