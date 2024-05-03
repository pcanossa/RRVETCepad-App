import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-atualiza-animal',
  templateUrl: './atualiza-animal.component.html',
  styleUrls: ['./atualiza-animal.component.css']
})
export class AtualizaAnimalComponent {
  funcDates = JSON.parse(localStorage.getItem('funcDates') ?? '{}');


  msgOK: any;
  msgError: any;
  cao:boolean = true;
  gato:boolean = false;
  sexo:string = 'default';
  cor:string = 'default';
  raca:string = 'default';
  vendedor: string = 'default';
  plano:string = 'default';
  especie:string = 'default';
  colaboradores: any[] = [];
  planos:any[] = [];
  tutores:any;
  id:any;
  CPFValid: boolean = false;
  formData: any;
  path: any;
  msgUrl: any;


  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headersDois = new HttpHeaders({
    'Authorization': `${this.token}`,
    'enctype': 'multipart/form-data'
  });

  headers = new HttpHeaders({
    'Authorization': `${this.token}`,
  });



  httpOptions = {
    headers: this.headers
  };

  httpOptionImg = {
    headers: this.headersDois
  }

  dadosAnimal: FormGroup | any;
  cliente: FormGroup | any;
  venda: FormGroup | any;




  public especies = ['Canina', 'Felina'];

  public racasCao = ['SRD',
  'Shih-Tzu',
  'Lhasa-Apso',
  'Yorkshire',
  'Poodle',
  'Buldogue Francês',
  'Buldogue Inglês',
  'Labrador',
  'Golden Retriever',
  'Spitz Alemão',
  'Papillon',
  'Pinscher',
  'Teckel',
  'Teckel Miniatura',
  'Poodle Toy',
  'Pastor Alemão',
  'Rottweiller',
  'Pastor Belga',
  'Pastor de Mallinois',
  'Border Collie',
  'Husky Siberiano',
  'Malamute do Alasca',
  'Pit Bull',
  'American Bully',
  'Schnauzer Miniatura',
  'Schanuzer',
  'Fila Brasileiro',
  'Paulistinha',
  'Cocker Spaniel',
  'Cavalier King Charles',
  'Pug',
  'Chihuahua',
  'Maltês',
  'Corgi',
  'Boxer',
  'Doberman',
  'Chow Chow',
  'Bull Terrier',
  'Collie',
  'Galgo',
  'Whippet',
  'Pequinês',
  'Dálmata',
  'Dogue Alemão',
  'Weimaraner',
  'Akita',
  'Shar-pei',
  'Bernese Mountain Dog',
  'São Bernardo',
  'Cane Corso',
  'Beagle',
  'Boston Terrier',
  'Bichon Frisé',
  'Shiba Inu',
  'Basenji',
  'Australian Cattle Dog',
  'Bullmastif',
  'American Staffordshire',
  'Rhodesian Ridgeback',
  'Dogo Argentino',
  'Terra-Nova',
  'Samoieda',
  'Pastor de Shetland',
  'Basset Hound',
  'Setter Irlandês',
  'Mastiff Inglês',
  'Schnauzer Gigante',
  'Setter Inglês',
  'West Highland Terrier',
  'Jack Russel',
  'Sheepdog',
  'Outro'
];

racasGato = [
  'Siamês',
  'SRD',
  'Persa',
  'Ragdoll',
  'Bengal',
  'Maine Coon',
  'Savannah',
  'Abissíno',
  'Sphinx',
  'Exótico',
  'British Shorthair',
  'Scottish Fold',
  'Birmanês',
  'Noruguês da Floresta',
  'Oriental',
  'Siberiano',
  'Balinês',
  'Devon Rex',
  'Ragamuffin',
  'Burmese',
  'Chartreaux',
  'Somali',
  'Tonquinês',
  'Himalaio',
  'American Curl',
  'Azul Russo',
  'Cornish Rex',
  'Bombay',
  'Peterbald',
  'Manx',
  'Singapura',
  'Angorá',
  'Outro'
];

cores = [
  'Preto',
  'Branco',
  'Caramelo',
  'Preto e Canela',
  'Merle',
  'Dapple',
  'Marrom',
  'Cinza',
  'Fulvo',
  'Sable',
  'Branco e Cinza',
  'Tigrado',
  'Ruão',
  'Champagne',
  'Abricot',
  'Creme',
  'Preto e Branco',
  'Marrom e Branco',
  'Cinza e Branco',
  'Tricolor',
  'Dourado',
  'Preto e Marrom',
  'Preto e Dourado',
  'Fígado',
  'Preto e Fulvo',
  'Chocolate',
  'Branco e Marrom',
  'Tricolor Fulvo',
  'Branco e Cinza',
  'Azul',
  'Preto e Creme',
  'Preto e Prata',
  'Prata e Caramelo',
  'Preto e Caramelo',
  'Fulvo e Creme',
  'Cinza e Tigrado',
  'Preto e Tigrado',
  'Preto e Prata',
  'Azul e Branco',
  'Azul e Preto',
  'Preto, Branco e Canela',
  'Preto, Branco e Marrom',
  'Preto, Branco e Prata',
  'Lilac',
  'Bege',
  'Outro'
];

porte = [
  'P',
  'M',
  'G'
]

aniSexo: string = 'Macho';
aniRaca: any;
animalDates: any;



tutorId: number = 0;





  constructor(private formBuilder: FormBuilder,  private http: HttpClient, private app: FuncionarioService) {
  }

  ngOnInit(): void {

    this.animalDates = JSON.parse(localStorage.getItem('animalDates') ?? '{}');

    this.dadosAnimal= this.formBuilder.group ( {
      nome: [this.animalDates.nome, [Validators.required]],
      especie: [this.animalDates.especie, [Validators.required]],
      raca: [this.animalDates.raca, Validators.required],
      cor: [this.animalDates.cor, Validators.required],
      sexo: [this.animalDates.sexo, [Validators.required]],
      particularidades: [this.animalDates.particularidades, ],
      foto: ['', ],
      porte: [this.animalDates.porte, Validators.required]
  });

   this.cliente= this.formBuilder.group ( {
    cpf: ['', [Validators.required]],
  });

  this.analisaEspecie();
  this.getSexo();
  this.aniRaca = this.animalDates.raca;

  console.log(this.dadosAnimal.value);
  }

  public async submit() {

       try {
          await this.cadastraAnimal();
          try {
            console.log(this.msgOK, this.msgOK.generateAnimal);
          }catch(e) {
            console.log('erro de cadastro de imagem', e);
          }
       } catch (e) {
        console.log(e);
       }

    }


  verificaCPF(value: string) {
    this.tutores = undefined;
    return this.CPFValid = /^\d+$/.test(value);
  }

  public getCols (headers: any) {
    this.app.consultaColaborador(headers)
    .subscribe({
      next: ((res:any)=> {
        for (let colaborador of res.colaboradores) {
          this.colaboradores.push(colaborador);
        }
      }),
      error: ((err:any)=> {
        console.log(err.message);
      })
    })
  }

  public getCli (headers: any) {
    this.app.consultaCli({cpf: this.cliente.value.cpf}, headers)
    .subscribe({
      next: ((res:any)=> {
        this.tutores = res;
        this.tutorId = this.tutores[0].tut_id;
      }),
      error: ((err:any)=> {
        console.log(err.message);
      })
    })
  }

  public getSexo () {
    if (this.dadosAnimal.sexo === 'F') {
      this.aniSexo = "Fêmea"
      return
    }
  }

  public getPrd (headers: any) {
    this.app.consultaPlanos(headers)
    .subscribe({
      next: ((res:any)=> {
        for (let plano of res.produtos) {
          this.planos.push(plano);
        }
      }),
      error: ((err:any)=> {
        console.log(err.message);
      })
    })
  }

  public uploadFoto(): Promise<void> {
    console.log(this.headersDois);

    return new Promise((resolve, reject) => {
      this.app.enviaFoto(this.formData, this.httpOptionImg)
        .subscribe({
          next: (res: any) => {
            this.path = res.path;
            console.log(this.path);
            resolve(); // Resolvendo a promessa quando a atribuição de this.path for concluída
          },
          error: (err: any) => {
            console.log(err.message);
            reject(err); // Rejeitando a promessa em caso de erro
          }
        });
    });
  }

  public async enviaUrl (headers: any, id: any, path: any) {
    this.app.bcEnvFoto({
      path: path,
      id: id
    }, headers)
    .subscribe({
      next: ((res:any)=> {
        return res;
      }),
      error: ((err:any)=> {
        this.msgUrl = err;
      })
    })
  }

  public async sendFoto(id:any) {
    try {
      await this.uploadFoto();

      try {
        await this.enviaUrl(this.httpOptions, id, this.path);
      } catch(e) {
        return console.log(e);
      }
    } catch (e) {
      return console.log(e);
    }
  }


  public getDateHours(): string {
    const dataHotaAtual = new Date();
    const formatoDataHora = 'yyyy-MM-dd HH:mm:ss';
    const dataHoraFormatada = format(dataHotaAtual, formatoDataHora);
    return dataHoraFormatada;
  }

  public async cadastraAnimal(): Promise<void> {
    const dataHora = this.getDateHours();
    return new Promise ((resolve, reject) => {
      this.app.altAnimal({
        nome: this.dadosAnimal.value.nome,
        especie: this.dadosAnimal.value.especie,
        raca: this.dadosAnimal.value.raca,
        cor: this.dadosAnimal.value.cor,
        sexo: this.dadosAnimal.value.sexo,
        rga: this.animalDates.rga,
        particularidade: this.dadosAnimal.value.particularidades,
        porte: this.dadosAnimal.value.porte
      }, this.httpOptions)
      .subscribe(
        {
          next: ((res)=> {
            this.msgOK =  res;
            resolve();
          }),
          error: ((err)=> {
            console.log(this.dadosAnimal.value);
            this.msgError = err.message;
            reject(err);
          })
        });
      });
  }

  analisaEspecie() {
    const especieElement = document.getElementById('especie') as HTMLSelectElement;
    const especie = especieElement?.value;
    if (especie === 'Felina' || this.animalDates.especie === 'Felina') {
      this.cao = false
      this.gato =true;
    } else {
      this.cao = true;
      this.gato =false;
    }
  }


  acionaOutro(idClasse:string, idValor:string): boolean {
    const outroElement = document.getElementById(idClasse) as HTMLInputElement;
    const valorOutroElement = document.getElementById(idValor) as HTMLInputElement;
    const outro = outroElement?.value;
    const valorOutro = valorOutroElement?.value;
    if (outro === 'Outro') {
      return true;
    } else if (valorOutro){
    return true;
    }
    return false;
  }

  verificaFoto():boolean {
    const fotoElement = document.getElementById('inputGroupFile01') as HTMLInputElement;
    const foto = fotoElement?.value;
    if (foto !== '') {
      return true;
    }
    return false;
  }

  atualizarFoto(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
    const foto = input.files[0];
    this.formData = new FormData();
    this.formData.append('foto', foto);
    this.dadosAnimal.get('foto')?.setValue(foto);
    }
  }

  formatarNumeroTelefone(numero: string): string {
    const numeroLimpo = numero.replace(/\D/g, '');

    if (numeroLimpo.length === 11) {
      return `(${numeroLimpo.substring(0, 2)}) ${numeroLimpo.substring(2, 7)}-${numeroLimpo.substring(7)}`;
    } else if (numeroLimpo.length === 10) {
      return `(${numeroLimpo.substring(0, 2)}) ${numeroLimpo.substring(2, 6)}-${numeroLimpo.substring(6)}`;
    }

    return numero;
  }

  verificaDados () {
    console.log(this.dadosAnimal.value);
  }



  validaSelects () {
    this.dadosAnimal.value.especie = this.especie;
    this.dadosAnimal.value.sexo = this.sexo;
    this.dadosAnimal.value.raca = this.raca;
    this.dadosAnimal.value.cor = this.cor;
    if (this.dadosAnimal.value.especie === 'default' ||
      this.dadosAnimal.value.raca === 'default' ||
      this.dadosAnimal.value.sexo === 'default' ||
      this.dadosAnimal.value.cor  === 'default'||
      this.dadosAnimal.value.especie === undefined ||
      this.dadosAnimal.value.raca === undefined ||
      this.dadosAnimal.value.sexo === undefined ||
      this.dadosAnimal.value.cor  === undefined ||
      this.dadosAnimal.value.porte === undefined ||
      this.dadosAnimal.value.rga === undefined
      ) {
        this.dadosAnimal.setErrors({erro: 'Erro de Dados'});
      } else {
        this.dadosAnimal.setErrors(null);
      }
  }
}
