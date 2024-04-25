import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AnimaisAppService } from 'src/app/services/animais-app.service';

@Component({
  selector: 'app-animal-page',
  templateUrl: './animal-page.component.html',
  styleUrls: ['./animal-page.component.css']
})
export class AnimalPageComponent implements OnInit {

  animalDates = JSON.parse(localStorage.getItem('animalDates') ?? '{}');
  dadosCarteirinha: any;
  vacinas:any;
  msgError:any;
  atraso:boolean = true;
  atendimentos:any;
  anexos: any[] = [];
  tamanho= {
    aplicacoes: 0,
    cirurgias: 0,
    encaminhamentos: 0,
    exames: 0,
    receituarios: 0
  };


  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`
  });

  httpOptions = {
    headers: this.headers
  };


  constructor( private appAnimal: AnimaisAppService) {
  }

  ngOnInit(): void {
    console.log(this.animalDates)
  }


  public async consultaDadosCarteirinha () {
    this.appAnimal.consultaCarteirinha({id: this.animalDates.id}, this.httpOptions)
    .subscribe({
      next: ((res) => {
        this.dadosCarteirinha = res.dados[0]
      }),
      error: (err)=> console.log(err)
    })
  }

  public async consultaVacinas () {
    this.appAnimal.consultaVacinas({id:this.animalDates.id}, this.httpOptions)
  .subscribe({
    next: ((res)=> {
      this.vacinas = res
      console.log(this.vacinas);
    }),
    error: ((err)=> {
      this.msgError = err.message;
    })
  })
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




  formatDate(dateString:any) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  verificaReforco(vacina: any): boolean {
    const dataReforco = new Date(vacina);
    const hoje = new Date();
    return dataReforco > hoje;
  }

  public async consultaTudo() {
    this.appAnimal.consultaAtendimentos({ id: this.animalDates.id }, this.httpOptions)
      .subscribe({
        next: (res) => {
          this.atendimentos = res;

          for (let atendimento of this.atendimentos.atendimento) {
            this.appAnimal.consultaAnexos({ id: atendimento.atd_id }, this.httpOptions)
              .subscribe({
                next: (res) => {
                  this.anexos.push(res);
                  for (let anexo of this.anexos) {
                    this.tamanho.aplicacoes = anexo.aplicacoes.length;
                    this.tamanho.cirurgias = anexo.cirurgias.length;
                    this.tamanho.encaminhamentos = anexo.encaminhamentos.length;
                    this.tamanho.exames = anexo.exames.length;
                    this.tamanho.receituarios = anexo.receituarios.length;
                 }
                },
                error: (err) => {
                  this.msgError = err.message;
                }
              });
          }


          console.log(this.anexos);
          console.log(this.tamanho);
        },
        error: (err) => {
          this.msgError = err.message;
        }
      });

  }

  analisaRealizacao(data:any) {
    if (data === null) {
      return 'Aguardando Realização';
    } else {
      return this.formatDate(data);
    }
  }




}
