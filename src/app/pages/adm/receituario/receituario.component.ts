import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpHeaders } from '@angular/common/http';
import { FuncionarioService } from 'src/app/services/funcionario.service';

interface Frequencias {
  [key: string]: string;
  SID: string;
  BID: string;
  TID: string;
  QID: string;
  PRN: string;
  DA: string;
  SEM: string;
  QUIN: string;
  MES: string;
  BI: string;
  TRI: string;
  CONT: string;
}

interface FarmaApresent {
  [key: string]: string;
  Comprimido: string;
  Gota: string;
  Injetável: string;
  Pomada: string;
  Creme: string;
  Sache: string;
  Xarope: string;
  Frasco: string;
  Caixa: string;
}

interface Apresentacoes {
  [key: string]: string;
  cp: string;
  ml: string;
  gota: string;
  g: string;
  porção: string;
  medida: string;
  sache: string;
  dose: string;
}



@Component({
  selector: 'app-receituario',
  templateUrl: './receituario.component.html',
  styleUrls: ['./receituario.component.css']
})
export class ReceituarioComponent implements OnInit {

  atdDates = JSON.parse(localStorage.getItem('atdDates') ?? '{}');
  recDates = JSON.parse(localStorage.getItem('recDates') ?? '{}');
  funcDates = JSON.parse(localStorage.getItem('funcDates') ?? '{}');
  atd: any;
  vetValidate: any;
  iv: any[] = [];
  vo: any[] = [];
  tp: any[] = [];
  sc: any[] = [];
  im: any[] = [];
  counter: number = 0;

  // Classe onde a função será utilizada

    frequencias: Frequencias = {
      SID: 'a cada 24 horas',
      BID: 'a cada 12 horas',
      TID: 'a cada 8 horas',
      QID: 'a cada 6 horas',
      PRN: 'a cada 2 horas',
      DA: 'em dias alternados',
      SEM: 'uma vez por semana',
      QUIN: 'a cada 15 dias',
      MES: 'uma vez ao mês',
      BI: 'a cada 2 meses',
      TRI: 'a cada 3 meses',
      CONT: 'uso contínuo'
    };

    apresentacoes: Apresentacoes = {
      cp: 'comprimido(s)',
      ml: 'ml',
      gota: 'gota(s)',
      g: 'grama(s)',
      porção: 'porção',
      medida: 'medida',
      sache: 'sachê',
      dose: 'dose'
    }

    apresentac: FarmaApresent = {
      Comprimido: 'cp',
      Gota: 'gotas',
      Injetável: 'injetável',
      Pomada: 'pomada',
      Creme: 'creme',
      Sache: 'sachê',
      Xarope: 'xarope',
      Frasco: 'frasco',
      Caixa: 'caixa',
      Colírio: 'colírio'
    }

    msgError: any;
    vet: any;

  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`
  });


  httpOptions = {
    headers: this.headers
  };


  constructor(private app: FuncionarioService){}

  async ngOnInit() {
    try {
      console.log(this.funcDates)
      await this.validaVeterinario();
      //console.log(this.atdDates);
      console.log(this.vet);
      console.log(this.recDates.receita);
      //await this.getAtend();
      console.log(this.atd);
      await this.separaVias();
    } catch (err) {
      console.log(err);
    }




  }

  @ViewChild('tudo') content!: ElementRef;



  gerarPDF() {
    html2canvas(this.content.nativeElement, {
      allowTaint: true,
      useCORS: false,
      scale: 1
    }).then(canvas => {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img, 'PNG', 7, 10, 195, this.calcHeight());
      doc.save('postres.pdf');
    });
  }

  formatarTelefone(numero: string): string {
    const ddd = numero.slice(0, 2);
    const parte1 = numero.slice(2, 7);
    const parte2 = numero.slice(7);

    return `(${ddd}) ${parte1}-${parte2}`;
  }

  calcHeight():number {
    const height = this.recDates.receita;
    return 100+(height.length*10)
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

  async consultaVeterinario(): Promise<any> {
    console.log(this.funcDates.id);
    return new Promise(async (resolve, reject) => {
      await this.app.validaVet({id: this.funcDates.idVet}, this.httpOptions)
      .subscribe ({
        next: ((res)=>{
          this.vetValidate = res.vet;

          resolve(this.vetValidate);
        }),
        error: ((err:any)=> {
          reject (err)
        })
      })
    })
  }

  async validaVeterinario() {
    try {
      const response = await this.app.validaVet({ id: this.funcDates.id }, this.httpOptions).toPromise(); // Convertendo Observable para Promise
      this.vet = response; // Atribuindo a resposta a this.vet
      this.msgError = response.message; // Definindo a mensagem de erro, se houver
      console.log('Dados Vet:', this.vet); // Verificando se os dados de vet estão corretos
    } catch (error) {
      this.msgError = error; // Lidando com erros
      console.error('Erro ao validar veterinário:', error);
      throw error; // Lançando o erro novamente para tratamento posterior
    }
  }

  async getAtend () {
    return new Promise(async (resolve, reject) => {
      await this.app.getAtendId({
        id: this.atdDates.id
      }, this.httpOptions).subscribe({
        next: ((res)=> {
          this.atd = res[0];
          resolve(this.atd)
        }),
        error: ((err:any)=> {reject(err)})
      })
    })
  }

  formatDateForm(dateString:any) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  formatHourMinutes(hour:any) {
    const hora = String(new Date(hour).getUTCHours()).padStart(2, '0');
    const minutos = String(new Date(hour).getUTCMinutes()).padStart(2, '0');
    return `${hora}:${minutos}`;
  }

  separaVias () {
    const recs = this.recDates.receita
    for (let rec of recs) {
      if (rec.via === 'VO') {
        this.vo.push(rec);
      } else if (rec.via === 'Tópico') {
        this.tp.push(rec);
      } else if (rec.via === 'IV') {
        this.iv.push(rec);
      } else if (rec.via === 'IM') {
        this.im.push(rec);
      } else if (rec.via === 'SC') {
        this.sc.push(rec);
      }
    }
  }

  getCount():number {
    const indice = this.counter+1;
    return indice
  }
}

