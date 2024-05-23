import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map, of, startWith } from 'rxjs';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';

export interface Dnc {
  name: string;
}

@Component({
  selector: 'app-app-atendimento',
  templateUrl: './app-atendimento.component.html',
  styleUrls: ['./app-atendimento.component.css'],
})
export class AppAtendimentoComponent implements OnInit{

  parametros: FormGroup = this.formBuilder.group ({
    peso: ['', Validators.required],
    bpm: ['', Validators.required],
    mpm: ['', Validators.required],
    temperatura: ['', Validators.required],
    mucosas: ['', Validators.required],
    linfP: ['Normal', Validators.required],
    linfI: ['Normal', Validators.required],
    linfPe: ['Normal', Validators.required],
    linfM: ['Normal', Validators.required],
    linfA:  ['Normal', Validators.required],
    ausResp: ['Normal', Validators.required],
    ausCard: ['Normal', Validators.required]
  });

  oParametros: FormGroup = this.formBuilder.group({
    tpc: ['', Validators.required],
    pa: ['', Validators.required]
  });

  exameFisico: FormGroup = this.formBuilder.group({
    ortopedico: ['NDN', Validators.required],
    cardiovascular: ['NDN', Validators.required],
    gastrointestinal: ['NDN', Validators.required],
    urinario: ['NDN', Validators.required],
    reprodutivo: ['NDN', Validators.required],
    respiratorio: ['NDN', Validators.required],
    endocrino: ['NDN', Validators.required],
    dermatologico: ['NDN', Validators.required],
    oftalmico: ['NDN', Validators.required],
    odontologico: ['NDN', Validators.required],
    neurologico: ['NDN', Validators.required],
  });

  anamnese: FormGroup = this.formBuilder.group({
    ambiente: ['', Validators.required],
    ingHidrica: ['', Validators.required],
    tipoAgua: ['', Validators.required],
    diurese: ['', Validators.required],
    aspectoUrina: ['', Validators.required],
    freqMiccao: ['', Validators.required],
    pesoCorporal: ['', Validators.required],
    escoreCorporal: ['', Validators.required],
    prurido: ['', Validators.required],
    freqPrurido: [''],
    inicioPrurido: [''],
    localPrurido: [''],
    vomito: ['', Validators.required],
    freqVomito: [''],
    inicioVomito: [''],
    regurgitacao: ['', Validators.required],
    freqRegurgitacao: [''],
    inicioRegurgitacao: [''],
    comportamento: ['', Validators.required],
    tipoComportamento: [''],
    inicioComportamento: [''],
    sono: ['', Validators.required],
    vocalizacao: ['', Validators.required],
    periodoVocalizacao: [''],
    inicioVocalizacao: [''],
    incoordenacao: ['', Validators.required],
    freqIncoordenacao: [''],
    inicioIncoordenacao: [''],
    momentoIncoordenacao: [''],
    sincope: ['', Validators.required],
    freqSincope: [''],
    inicioSincope: [''],
    momentoSincope: [''],
    tosse: ['', Validators.required],
    freqTosse: [''],
    inicioTosse: [''],
    momentoTosse: [''],
    crise: ['', Validators.required],
    freqCrise: [''],
    inicioCrise: [''],
    momentoCrise: [''],
    lambedura: ['', Validators.required],
    freqLambedura: [''],
    inicioLambedura: [''],
    momentoLambedura: [''],
    carrapatos: ['', Validators.required],
    pulgas: ['', Validators.required],
    vermes: ['', Validators.required],
    outras: ['NDN'],
    tipoAlimentacao: ['', Validators.required],
    marcaRacao: [''],
    tamRacao: [''],
    freqAlimentar: ['', Validators.required],
    motivoComida: [''],
    aspectoFezes: ['', Validators.required],
    freqDefeccao: ['', Validators.required],
    suplemento: ['', Validators.required],
    motivoSuplemento: [''],
    inicioSuplemento: [''],
    banho: ['',Validators.required],
    freqBanho: [''],
    inicioBanho: [''],
    motivoBanho: [''],
    arrancamentoPelo: ['', Validators.required],
    antirrabica: ['', Validators.required],
    polivalente: ['', Validators.required],
    vermifugo: ['', Validators.required],
    ectoparasiticida: ['', Validators.required],
    tipoEcto: ['', Validators.required],
    castracao: ['', Validators.required],
    motivoCastracao: [''],
    petiscos: ['', Validators.required],
    freqPetiscos: [''],
    inicioPestiscos: ['']
  })

  apliVacina: FormGroup = this.formBuilder.group({
    reforco: ['', Validators.required],
    validade: ['', Validators.required],
    lote: ['', Validators.required],
    vacina: ['', Validators.required],
    marca: ['', Validators.required],
    id: ['']
  });


  aplicacoes: FormGroup = this.formBuilder.group({
    medicacao: ['', Validators.required],
    apresentacao: ['', Validators.required],
    concentracao: ['', Validators.required],
    via: ['', Validators.required],
    dose: ['', Validators.required],
    medidaD: ['', Validators.required],
    medidaC: ['', Validators.required],
    id: [0]
  });

  receituario: FormGroup = this.formBuilder.group ({
    medicacao: ['', Validators.required],
    apresentacao: ['', Validators.required],
    concentracao: ['', Validators.required],
    duracao: ['', Validators.required],
    via: ['', Validators.required],
    dose: ['', Validators.required],
    frequencia: ['', Validators.required],
    medidaD: ['', Validators.required],
    medidaC: ['', Validators.required],
    orientacao: ['', Validators.required],
    id: new FormControl(null),
  })

  tipoAtendimento: FormGroup = this.formBuilder.group({
    tipo: ['', Validators.required],
    evolucao: [''],
    detalhes: ['']

  })

  pExames: FormGroup = this.formBuilder.group ({
    exame: ['', Validators.required],
    amostra: ['', Validators.required],
    citologia: ['Forma de Coleta: \nLocal: \nAspecto: \nUlceração: \nColoração: \nFormato: \nTextura: \nOutras Informações: ', Validators.required],
    exameId: [0],
    amostraId: [0],
  })

  eCirurgias: FormGroup = this.formBuilder.group ({
    cirurgia: ['', Validators.required],
    cirurgiaId: [0]
  })

  eEspecialistas: FormGroup = this.formBuilder.group ({
    especialista: ['', Validators.required],
    especialistaId: [0]
  })




  diagnosticos = new FormControl;
  dncAnteriores = new FormControl;
  medicacoes = new FormControl;
  exames = new FormControl;
  amostra = new FormControl;
  cirurgias = new FormControl;
  especialistas = new FormControl;
  vacMarca = new FormControl;
  vacinas = new FormControl;
  vacId = new FormControl;
  filteredOptionsDiag: Observable<any[]> = of([]);
  filteredOptionsDncAnteriores: Observable<any[]> = of([]);
  filteredOptionsMed: Observable<any[]> = of([]);
  filteredOptionsExm: Observable<any[]> = of([]);
  filteredOptionsAmo: Observable<any[]> = of([]);
  filteredOptionsCir: Observable<any[]> = of([]);
  filteredOptionsEsp: Observable<any[]> = of([]);
  filteredOptionsVac: Observable<any[]> = of([]);
  filteredOptionsVacMarca: Observable<any[]> = of([]);
  autoMed!:MatAutocomplete;
  autoDnc!:MatAutocomplete;
  autoExm!:MatAutocomplete;
  autoAmo!:MatAutocomplete;
  autoCir!:MatAutocomplete;
  autoEsp!:MatAutocomplete;
  autoVac!:MatAutocomplete;
  autoVacId!:MatAutocomplete;
  autoVacMarca!:MatAutocomplete;
  doencas: any[] = [];
  apli: any[] = [];
  pexms: any[] = [];
  pcir: any[] = [];
  pesp: any[] = [];
  rec: any[] = [];
  tvac: any[] = [];
  orientacoes: any[] = [];
  doencasAnteriores: any[] = [];
  dnc_nome: any;
  resolve = '';
  erro: any;

  panelOpenState = false;
  dnc: any;
  exm: any;
  esp: any;
  cir: any;
  med: any;
  vac: any;

  atdDates = JSON.parse(localStorage.getItem('atdDates') ?? '{}');
  funcDates = JSON.parse(localStorage.getItem('funcDates') ?? '{}');
  vetDates = JSON.parse(localStorage.getItem('vetDates') ?? '{}');



  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`
  });


  httpOptions = {
    headers: this.headers
  };

  indices: any;


  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);

  public showTooltip = false;

  vias =[
    'VO',
    'IV',
    'IM',
    'SC',
    'Tópico'
  ]

  anm_hidrica = [
    'normal',
    'diminuída',
    'aumentada'
  ];

  anm_agua =[
    'torneira',
    'filtrada'
  ];

  anm_diurese = [
    'normal',
    'diminuída',
    'aumentada',
    'várias vezes, pequena quantidade'
  ];

  anm_aspecto_urina = [
    'amarelo',
    'acastanhada',
    'amarelo claro',
    'avermelhada',
    'alaranjada',
    'transparente',
    'amarelo muito claro',
    'esbranquiçada'
  ];

  anm_peso_corporal = [
    'ganho de peso',
    'mantendo peso',
    'emagrecimento'
  ];

  anm_escore_corporal = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '7',
    '8',
    '9'
  ];

  anm_ambiente = [
    'domiciliado - sem contato com rua',
    'domiciliado - com contato com rua',
    'semi_domiciliado',
    'não domiciliado'
  ]

  anm_booleana = [
    'ausente',
    'presente'
  ];

  anm_frequencias = [
    'algumas vezes ao dia',
    'varias vezes ao dia',
    'esporadicamente',
    'algumas vezes semanalmente',
    'algumas vezes mensalmente',
    'todo o tempo'
  ];

  anm_inicios = [
    'um dia a uma semana',
    'uma semana a 15 dias',
    '15 dias a uma mês',
    'um mês a 3 meses',
    '3 meses a 6 meses',
    '6 meses a 1 ano',
    '1 ano ou mais'
  ];

  anm_comportamento = [
    'agressividade',
    'apatia',
    'hiperatividade',
    'normal',
    'impaciência'
  ];

  anm_sono = [
    'aumentado',
    'diminuído',
    'normal',
    'intermitente'
  ];

  anm_periodos = [
    'noturno',
    'diurno',
    'constante',
    'indefinido'
  ];

  anm_momentos = [
    'após alimentação',
    'após exercício',
    'após sono',
    'após estímulos',
    'durante alimentação',
    'durante exercício',
    'durante sono',
    'durante estímulos'
  ];

  anr_alimentos = [
    'ração',
    'comida',
    'misto'
  ];

  anr_frequencia_racao = [
    '1x ao dia',
    '2x ao dia',
    '3x ao dia',
    '4x ao dia',
    '6x ou mais',
    'ad libitum'
  ];

  anr_motivo_comida = [
    'apetite caprichoso',
    'recomendação veterinária',
    'acredita ser mais nutritivo',
    'acredita ser mais saudável'
  ];

  anr_fezes = [
    'normal',
    'aquosa',
    'mucosa',
    'sanguinolenta',
    'melena',
    'pastosa'
  ];


  anp_motivo_recusa =[
    'ganho de peso',
    'perda de virilidade',
    'diminuição de atividade',
    'risco cirúrgico',
    'falta de recursos'
  ];

  ans_suplemetacao = [
    'ganho de peso',
    'ganho de massa muscular',
    'prescrição veterinária',
    'fortalecimento',
    'suplementação óssea',
    'melhora de saúde'
  ];

  anp_ectoparasiticida = [
    'pipeta',
    'comprimido',
    'coleira',
    'ivermectina'
  ]

  mucosas =[
    'Normocaradas',
    'Hipocoradas',
    'Congestas',
    'Ictéricas',
    'Perláceas',
    'Cianóticas'
  ];

  linfonodos = {
    linfP: 'Poplíteo',
    linfM: 'Mandibular',
    linfPe: 'Pré Ecapular',
    linfI: 'Inguinal',
    linfA: 'Axilar'
  };

  linfEstado = [
    'Normal',
    'Aumentado'
  ];

  sonsRespiratorios= [
    'Normal',
    'Estertor',
    'Sibilo',
    'Ronco',
    'Crepitação',
    'Estridor',
    'Abafado'
  ];

  sonsCardiacos= [
    'Normal',
    'Sopro Sistólico',
    'Sopro Diastólico',
    'Sopro Contínuo',
    'Atrito Pericárdico',
    'Abafado'
  ]

  examesFisicos =
    {
      ortopedico:   'Sistema Ortopédico',
      cardiovascular:  'Sistema Cardiovascular',
      gastrointestinal:  'Sistema Gastrointestinal',
      urinario:   'Sistema Urinário',
      reprodutivo:  'Sistema Reprodutivo',
      respiratorio:  'Sistema Respiratório',
      endocrino:  'Sistema Endócrino',
      dermatologico:  'Dermatológico',
      oftalmico:  'Oftálmico',
      odontologico: 'Odontológico',
      neurologico: 'Neurológico'
    }



  apresentacoes = [
    'Comprimido',
    'Gota',
    'Injetável',
    'Pomada',
    'Creme',
    'Sachê',
    'Xarope',
    'Frasco',
    'Caixa',
    'Colírio'
  ]

  concentracoes=[
    'mg/ml',
    '%',
    'mg',
    'g'
  ]

  frequencias =
    {
      SID: 'a cada 24 horas',
      BID: 'a cada 12 horas',
      TID: 'a cad 8 horas',
      QID: 'a cada 6 horas',
      PRN: 'a cada 2 horas',
      DA: 'em dias alternados',
      SEM: 'uma vez por semana',
      QUIN: 'a cada 15 dias',
      MES: 'uma vez ao mês',
      BI: 'a cada 2 meses',
      TRI: 'a cada 3 meses',
      CONT: 'uso contínuo'
    }
  options: any;


  constructor(private app: FuncionarioService, private formBuilder: FormBuilder, private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.pegaIndicesAutoCoomplete();
      console.log(this.med);

    } catch (err) {

    }
    this.filteredOptionsDiag = this.diagnosticos.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterDnc(value))
    );
    this.filteredOptionsDncAnteriores = this.dncAnteriores.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterDnc(value))
    );
    this.filteredOptionsMed = this.medicacoes.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterMed(value))
    );
    this.filteredOptionsExm = this.exames.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterExm(value))
    );
    this.filteredOptionsAmo = this.amostra.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterAmo(value))
    );
    this.filteredOptionsCir = this.cirurgias.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterCir(value))
    );
    this.filteredOptionsEsp = this.especialistas.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterEsp(value))
    );
  }


  private _filterDnc(value: string): { dnc_doenca: string }[] {
    const filterValue = value.toLowerCase();
    return this.dnc.filter((option: { dnc_doenca: string }) => option.dnc_doenca.toLowerCase().includes(filterValue));
  }

  private _filterMed(value: string): { med_nome: string }[] {
    const filterValue = value.toLowerCase();
    return this.med.filter((option: { med_nome: string }) => option.med_nome.toLowerCase().includes(filterValue));
  }
  private _filterExm(value: string): { exm_exame: string }[] {
    const filterValue = value.toLowerCase();
    return this.exm.filter((option: { exm_exame: string }) => option.exm_exame.toLowerCase().includes(filterValue));
  }
  private _filterAmo(value: string): { exm_tipo_amostra: string }[] {
    const filterValue = value.toLowerCase();
    const filteredOptions = this.exm.filter((option: { exm_tipo_amostra: string }) => option.exm_tipo_amostra.toLowerCase().includes(filterValue));
    const uniqueOptions = filteredOptions.filter((option: { exm_tipo_amostra: any; }, index: any, self: any[]) => self.findIndex(o => o.exm_tipo_amostra === option.exm_tipo_amostra) === index);
    return uniqueOptions;
  }
  private _filterCir(value: string): { cir_nome: string }[] {
    const filterValue = value.toLowerCase();
    return this.cir.filter((option: { cir_nome: string }) => option.cir_nome.toLowerCase().includes(filterValue));
  }
  private _filterEsp(value: string): {esp_nome: string }[] {
    const filterValue = value.toLowerCase();
    return this.esp.filter((option: { esp_nome: string }) => option.esp_nome.toLowerCase().includes(filterValue));
  }




  getNomeChaves(key: string) {
    const [chaveEncontrada] = Object.entries(this.frequencias).find(([chave, valor]) => chave === key) || [];
    return chaveEncontrada;
  }

  get tooltipContent(): string {
    return Object.entries(this.frequencias)
      .map(([key, value]) => `${key} = ${value}`)
      .join('\n');
  }

  public async pegaIndicesAutoCoomplete(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.app.buscaIndiceAutoComplete(this.httpOptions)
      .subscribe({
        next: ((res)=> {
          this.indices = res;
          this.cir = this.indices.cirurgias;
          this.med = this.indices.medic;
          this.esp = this.indices.especialistas;
          this.exm = this.indices.exames;
          this.dnc = this.indices.diagnosticos;
          this.vac = this.indices.vacinas;
          console.log(this.indices)
          console.log(this.cir, this.esp, this.exm, this.dnc, this.med, this.vac);
          resolve(this.indices)
        }),
        error: (err)=> reject(err)
      });
    });
  }


  public addArray (array: any[], form: any) {
    array.push(form.value);
  }

  public addArrayDois (array: any[], form: any) {
    array.push(form);
  }

  public removeArray (array: any[], index: number) {
    array.splice(index,1);
  }

  addAplic() {
    this.aplicacoes.value.medicacao = this.medicacoes.value;
    this.apli.push({...this.aplicacoes.value});
    console.log(this.apli);
  }

  onMedicationSelected(event: MatAutocompleteSelectedEvent) {
    console.log('onMedicationSelected called');
    const med = event.option.value.i;
    console.log(med);
    this.receituario.get('id')?.setValue(med.med_id);
  }

  onVacineSelected(event: MatAutocompleteSelectedEvent) {
    console.log(this.vacId);
  }

  addVac() {
    this.apliVacina.value.vacina = this.vacinas.value;
    this.apliVacina.value.marca = this.vacMarca.value;
    this.tvac.push({...this.apliVacina.value});
    console.log(this.tvac);
  }

  addReceituario() {
    this.receituario.value.medicacao = this.medicacoes.value;
    this.rec.push({...this.receituario.value});
    console.log(this.rec)
  }

  addExame() {
    this.pExames.value.exame = this.exames.value;
    this.pExames.value.amostra = this.amostra.value;
    this.pexms.push({exame: this.exames.value, amostra: this.amostra.value, citologia: this.pExames.value.citologia});
  }
  addCirurgia() {
    this.eCirurgias.value.cirurgia = this.cirurgias.value;
    this.pcir.push({cirurgia: this.cirurgias.value});
  }

  addEncaminhamento() {
    this.eEspecialistas.value.especialista = this.especialistas.value;
    this.pesp.push({especialista: this.especialistas.value});
  }

  formatDate(dateString:any) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formatDateBD() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
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

  formatarTelefone(numero: string): string {
    const ddd = numero.slice(0, 2);
    const parte1 = numero.slice(2, 7);
    const parte2 = numero.slice(7);

    return `(${ddd}) ${parte1}-${parte2}`;
  }

  mostraReceita() {
    localStorage.setItem('recDates', JSON.stringify({receita: this.rec, orientacoes: this.orientacoes}));
  }



  teste () {
    console.log(this.vac);
  }

  async registraAtendimento () {
    return new Promise(async (resolve, reject) => {
      await this.app.registraDadosAtendimento({
        atdId: this.atdDates.id,
        temperatura: this.parametros.value.temperatura,
        mucosas: this.parametros.value.mucosas,
        respiratorio: this.parametros.value.mpm,
        cardiaco: this.parametros.value.bpm,
        ausResp: this.parametros.value.ausResp,
        ausCard: this.parametros.value.ausCard,
        linfonodos: `${this.parametros.value.linfP}/${this.parametros.value.linfI}/${this.parametros.value.LinfPe}/${this.parametros.value.linfM}/${this.parametros.value.linfA}`,
        pa: this.oParametros.value.pa,
        peso: this.parametros.value.peso,
        sistResp: this.exameFisico.value.respiratorio,
        sistOrtopedico: this.exameFisico.value.ortopedico,
        sistCardiovascular: this.exameFisico.value.cardiovascular,
        sistEndocrino: this.exameFisico.value.endocrino,
        sistGastrointestinal: this.exameFisico.value.gastrointestinal,
        sisteUrinario: this.exameFisico.value.urinario,
        sistReprodutivo: this.exameFisico.value.reprodutivo,
        dermatologico: this.exameFisico.value.dermatologico,
        oftalmico: this.exameFisico.value.oftalmico,
        odontologico: this.exameFisico.value.odontologico,
        neurologico: this.exameFisico.value.neurologico
      }, this.httpOptions).subscribe({
        next: ((res)=> {
          resolve(res);
        }),
        error: ((err)=> {
          reject(err);
        })
      })
    })
  }

  async registraAnamneseMedica () {
    return new Promise(async (resolve, reject) => {
      await this.app.registraAnMedica({
        adtId: this.atdDates.id,
        acesso: this.anamnese.value.ambiente,
        ingestaoHidrica: this.anamnese.value.ingHidrica,
        agua: this.anamnese.value.tipoAgua,
        diurese: this.anamnese.value.diurese,
        urina: this.anamnese.value.aspectoUrina,
        freqUrina: this.anamnese.value.freqMiccao,
        pesoCorporal: this.anamnese.value.pesoCorporal,
        escore: this.anamnese.value.escoreCorporal,
        prurido: this.anamnese.value.prurido,
        freqPrurido: this.anamnese.value.freqPrurido,
        inicioPrurido: this.anamnese.value.inicioPrurido,
        localPrurido: this.anamnese.value.localPrurido,
        vomito: this.anamnese.value.vomito,
        freqVomito: this.anamnese.value.freqVomito,
        inicioVomito: this.anamnese.value.inicioVomito,
        regurgitacao: this.anamnese.value.regurgitacao,
        freqRegurgitacao: this.anamnese.value.freqRegurgitacao,
        inicioRegurgitacao: this.anamnese.value.inicioRegurgitacao,
        comportamento: this.anamnese.value.comportamento,
        tipoComportamento: this.anamnese.value.tipoComportamento,
        inicioComportamento: this.anamnese.value.inicioComportamento,
        sono: this.anamnese.value.sono,
        vocalizacao: this.anamnese.value.vocalizacao,
        periodoVocalizacao: this.anamnese.value.periodoVocalizacao,
        inicioVocalizacao: this.anamnese.value.inicioVocalizacao,
        sincope: this.anamnese.value.sincope,
        inicioSincope: this.anamnese.value.inicioSincope,
        momentoSincope: this.anamnese.value.momentoSincope,
        freqSincope: this.anamnese.value.freqSincope,
        incoordencao: this.anamnese.value.incoordenacao,
        inicioIncoordencao: this.anamnese.value.inicioIncoordenacao,
        momentoIncoordenacao: this.anamnese.value.momentoIncoordenacao,
        tosse: this.anamnese.value.tosse,
        freqTosse: this.anamnese.value.freqTosse,
        inicioTosse: this.anamnese.value.inicioTosse,
        epiletica: this.anamnese.value.crise,
        freqEpiletica: this.anamnese.value.freqCrise,
        inicioEpiletica: this.anamnese.value.inicioCrise,
        momentoEpiletica: this.anamnese.value.momentoCrise,
        lambedura: this.anamnese.value.lambedura,
        freqLambedura: this.anamnese.value.freqLambedura,
        inicioLambedura: this.anamnese.value.inicioLambedura,
        momentoLambedura: this.anamnese.value.momentoLambedura,
        carrapatos: this.anamnese.value.carrapatos,
        pulgas: this.anamnese.value.pulgas,
        vermes: this.anamnese.value.vermes,
        outros: this.anamnese.value.outras
      }, this.httpOptions).subscribe({
        next: ((res)=> {
          resolve(res);
        }),
        error: ((err)=> {
          reject(err);
        })
      })
    })
  };

  async registraAnAlimentar () {
    return new Promise(async (resolve, reject) => {
      await this.app.registraAnAlimentar({
        atdId: this.atdDates.id,
        tipo: this.anamnese.value.tipoAlimentacao,
        adquirido: this.anamnese.value.marcaRacao,
        freqOfertada: this.anamnese.value.freqAlimentar,
        duracao: this.anamnese.value.tamRacao,
        motivoComida: this.anamnese.value.motivoComida,
        aspectoFezes: this.anamnese.value.aspectoFezes,
        freqFezes: this.anamnese.value.freqDefeccao
      }, this.httpOptions).subscribe({
        next: ((res)=> {
          resolve(res);
        }),
        error: ((err)=> {
          reject(err);
        })
      })
    })
  };


  async registraAnPreventivos () {
    return new Promise(async (resolve, reject) => {
      await this.app.registraAnPreventivos({
        atdId: this.atdDates.id,
        antirabica: this.anamnese.value.antirrabica,
        polivalente: this.anamnese.value.polivalente,
        castracao: this.anamnese.value.castracao,
        recusa: this.anamnese.value.motivoCastracao,
        vermifugacao: this.anamnese.value.vermifugo,
        ectoparasiticida: this.anamnese.value.ectoparasiticida,
        tipoParasiticida: this.anamnese.value.tipoEcto
      }, this.httpOptions).subscribe({
        next: ((res)=> {
          resolve(res);
        }),
        error: ((err)=> {
          reject(err);
        })
      })
    })
  };

  async registraAnSuplementar () {
    return new Promise(async (resolve, reject) => {
      await this.app.registraAnSuplementar({
        atdId: this.atdDates.id,
        suplemento: this.anamnese.value.suplemento,
        motivo: this.anamnese.value.motivoSuplemento,
        inicio: this.anamnese.value.inicioSuplemento
      }, this.httpOptions).subscribe({
        next: ((res)=> {
          resolve(res);
        }),
        error: ((err)=> {
          reject(err);
        })
      })
    })
  };

  async registraAnOutros () {
    return new Promise(async (resolve, reject) => {
      await this.app.registraAnOutros({
        atdId: this.atdDates.id,
        petisco: this.anamnese.value.petiscos,
        frequencia: this.anamnese.value.freqPetiscos,
        inicio: this.anamnese.value.inicioPestiscos
      }, this.httpOptions).subscribe({
        next: ((res)=> {
          resolve(res);
        }),
        error: ((err)=> {
          reject(err);
        })
      })
    })
  };

  async registraDoencasAnteriores () {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.doencasAnteriores.length; i++){
        await this.app.registraAnteriores({
          atdId: this.atdDates.id,
          doenca: this.doencasAnteriores[i]
        }, this.httpOptions).subscribe({
          next: ((res)=> {
            this.resolve = res;
          }),
          error: ((err)=> {
            this.erro = err;
          })
        });
      };
      resolve(this.resolve);
      reject(this.erro);
    })
  };

  async registraSuspeitasDiagnosticas () {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.doencas.length; i++){
        await this.app.registraSuspeitas({
          atdId: this.atdDates.id,
          doenca: this.doencas[i]
        }, this.httpOptions).subscribe({
          next: ((res)=> {
            this.resolve = res;
          }),
          error: ((err)=> {
            this.erro = err;
          })
        });
      };
      resolve(this.resolve);
      reject(this.erro);
    })
  };

  async registraReceita () {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.rec.length; i++){
        await this.app.registraReceita({
          medic: this.rec[i].medicacao,
          apresentacao: this.rec[i].apresentacao,
          concentracao: this.rec[i].concentracao+this.rec[i].medidaC,
          atdId: this.atdDates.id,
          frequencia: this.rec[i].frequencia,
          duracao: this.rec[i].duracao+'dias',
          quantidade: this.rec[i].dose+this.rec[i].medidaD,
        }, this.httpOptions).subscribe({
          next: ((res)=> {
            this.resolve = res;
          }),
          error: ((err)=> {
            this.erro = err;
          })
        });
      };
      resolve(this.resolve);
      reject(this.erro);
    })
  };

  async registraAplicacao () {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.apli.length; i++){
        await this.app.registraAplicaco({
          medic: this.apli[i].medicacao,
          apresentacao: this.apli[i].apresentacao,
          concentracao: this.apli[i].concentracao+this.apli[i].medidaC,
          atdId: this.atdDates.id,
          via: this.apli[i].via,
          quantidade: this.apli[i].dose+this.apli[i].medidaD,
        }, this.httpOptions).subscribe({
          next: ((res)=> {
            this.resolve = res;
          }),
          error: ((err)=> {
            this.erro = err;
          })
        });
      };
      resolve(this.resolve);
      reject(this.erro);
    })
  };

  async registraVacina () {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.tvac.length; i++){
        await this.app.registraVacina({
          vacina: this.tvac[i].vacina,
          marca: this.tvac[i].marca,
          animalId: this.atdDates.agdDates.ani_id,
          vetId: this.vetDates[0].vet_id,
          vencimento: `${this.tvac[i].validade._i.year}-${this.tvac[i].validade._i.month}-${this.tvac[i].validade._i.date}`,
          lote: this.tvac[i].lote,
          reforco: `${this.tvac[i].reforco._i.year}-${this.tvac[i].reforco._i.month}-${this.tvac[i].reforco._i.date}`,
          data: this.formatDateBD()
        }, this.httpOptions).subscribe({
          next: ((res)=> {
            this.resolve = res;
          }),
          error: ((err)=> {
            this.erro = err;
          })
        });
      };
      resolve(this.resolve);
      reject(this.erro);
    })
  };

  async registraExame () {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.pexms.length; i++){
        await this.app.registraExame({
          data: this.formatDateBD(),
          exame: this.pexms[i].exame,
          amostra: this.pexms[i].amostra,
          citotlogia: this.pexms[i].citologia,
          atdId: this.atdDates.id
        }, this.httpOptions).subscribe({
          next: ((res)=> {
            this.resolve = res;
          }),
          error: ((err)=> {
            this.erro = err;
          })
        });
      };
      resolve(this.resolve);
      reject(this.erro);
    })
  };

  async registraEncCirurgico () {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.pcir.length; i++){
        await this.app.registraencencCirurgia({
          data: this.formatDateBD(),
          cirurgia: this.pcir[i].cirurgia,
          atdID: this.atdDates.id
        }, this.httpOptions).subscribe({
          next: ((res)=> {
            this.resolve = res;
          }),
          error: ((err)=> {
            this.erro = err;
          })
        });
      };
      resolve(this.resolve);
      reject(this.erro);
    })
  };

  async registraEncEspecialista () {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.pesp.length; i++){
        await this.app.registraencEspecialista({
          especialista: this.pesp[i].especialista,
          atdID: this.atdDates.id
        }, this.httpOptions).subscribe({
          next: ((res)=> {
            this.resolve = res;
          }),
          error: ((err)=> {
            this.erro = err;
          })
        });
      };
      resolve(this.resolve);
      reject(this.erro);
    })
  };

  async registraRetorno (): Promise<any> {
    if (this.tipoAtendimento.value === 'R') {
        return new Promise(async (resolve, reject) => {
          await this.app.registraRetorno({
            atdId: this.atdDates.id,
            evolucao: this.tipoAtendimento.value.evolucao,
            detalhes: this.tipoAtendimento.value.detalhes
          }, this.httpOptions).subscribe({
            next: ((res)=> {
              resolve(res);
            }),
            error: ((err)=> {
              reject(err);
            })
          })
        })
    }
  };

  async registraInformacoes(){
    try {
      //await this.registraAtendimento();
      //await this.registraAnamneseMedica();
      //await this.registraAnAlimentar();
      //await this.registraAnPreventivos();
      //await this.registraAnSuplementar();
      //await this.registraAnOutros();
      //await this.registraDoencasAnteriores();
      //await this.registraSuspeitasDiagnosticas();
      //await this.registraReceita();
      //await this.registraAplicacao();
      //await this.registraVacina();
      await this.registraExame();
      //await this.registraEncCirurgico();
      //await this.registraEncEspecialista();
      //await this.registraRetorno();
      this.resolve = `Atendimento cadastrado com sucesso!`;
    } catch (err) {
      this.erro = err;
    }
  }

  verDados() {
    console.log( {atdId: this.atdDates.id,
      temperatura: this.parametros.value.temperatura,
      mucosas: this.parametros.value.mucosas,
      respiratorio: this.parametros.value.mpm,
      cardiaco: this.parametros.value.bpm,
      ausResp: this.parametros.value.ausResp,
      ausCard: this.parametros.value.ausCard,
      linfonodos: `${this.parametros.value.linfP}/${this.parametros.value.linfI}/${this.parametros.value.LinfPe}/${this.parametros.value.linfM}/${this.parametros.value.linfA}`,
      pa: this.oParametros.value.pa,
      peso: this.parametros.value.peso,
      sistResp: this.exameFisico.value.respiratorio,
      sistOrtopedico: this.exameFisico.value.ortopedico,
      sistCardiovascular: this.exameFisico.value.cardiovascular,
      sistEndocrino: this.exameFisico.value.endocrino,
      sistGastrointestinal: this.exameFisico.value.gastrointestinal,
      sisteUrinario: this.exameFisico.value.urinario,
      sistReprodutivo: this.exameFisico.value.reprodutivo,
      dermatologico: this.exameFisico.value.dermatologico,
      oftalmico: this.exameFisico.value.oftalmico,
      odontologico: this.exameFisico.value.odontologico,
      neurologico: this.exameFisico.value.neurologico,
acesso: this.anamnese.value.ambiente,
      ingestaoHidrica: this.anamnese.value.ingHidrica,
      agua: this.anamnese.value.tipoAgua,
      diurese: this.anamnese.value.diurese,
      urina: this.anamnese.value.aspectoUrina,
      freqUrina: this.anamnese.value.freqMiccao,
      pesoCorporal: this.anamnese.value.pesoCorporal,
      escore: this.anamnese.value.escoreCorporal,
      prurido: this.anamnese.value.prurido,
      freqPrurido: this.anamnese.value.freqPrurido,
      inicioPrurido: this.anamnese.value.inicioPrurido,
      localPrurido: this.anamnese.value.localPrurido,
      vomito: this.anamnese.value.vomito,
      freqVomito: this.anamnese.value.freqVomito,
      inicioVomito: this.anamnese.value.inicioVomito,
      regurgitacao: this.anamnese.value.regurgitacao,
      freqRegurgitacao: this.anamnese.value.freqRegurgitacao,
      inicioRegurgitacao: this.anamnese.value.inicioRegurgitacao,
      comportamento: this.anamnese.value.comportamento,
      tipoComportamento: this.anamnese.value.tipoComportamento,
      inicioComportamento: this.anamnese.value.inicioComportamento,
      sono: this.anamnese.value.sono,
      vocalizacao: this.anamnese.value.vocalizacao,
      periodoVocalizacao: this.anamnese.value.periodoVocalizacao,
      inicioVocalizacao: this.anamnese.value.inicioVocalizacao,
      sincope: this.anamnese.value.sincope,
      inicioSincope: this.anamnese.value.inicioSincope,
      momentoSincope: this.anamnese.value.momentoSincope,
      freqSincope: this.anamnese.value.freqSincope,
      incoordencao: this.anamnese.value.incoordenacao,
      inicioIncoordencao: this.anamnese.value.inicioIncoordenacao,
      momentoIncoordenacao: this.anamnese.value.momentoIncoordenacao,
      tosse: this.anamnese.value.tosse,
      freqTosse: this.anamnese.value.freqTosse,
      inicioTosse: this.anamnese.value.inicioTosse,
      epiletica: this.anamnese.value.crise,
      freqEpiletica: this.anamnese.value.freqCrise,
      inicioEpiletica: this.anamnese.value.inicioCrise,
      momentoEpiletica: this.anamnese.value.momentoCrise,
      lambedura: this.anamnese.value.lambedura,
      freqLambedura: this.anamnese.value.freqLambedura,
      inicioLambedura: this.anamnese.value.inicioLambedura,
      momentoLambedura: this.anamnese.value.momentoLambedura,
      carrapatos: this.anamnese.value.carrapatos,
      pulgas: this.anamnese.value.pulgas,
      vermes: this.anamnese.value.vermes,
      outros: this.anamnese.value.outras,
tipo: this.anamnese.value.tipoAlimentacao,
      adquirido: this.anamnese.value.marcaRacao,
      freqOfertada: this.anamnese.value.freqAlimentar,
      duracao: this.anamnese.value.tamRacao,
      motivoComida: this.anamnese.value.motivoComida,
      aspectoFezes: this.anamnese.value.aspectoFezes,
      freqFezes: this.anamnese.value.freqDefeccao,
antirabica: this.anamnese.value.antirrabica,
      polivalente: this.anamnese.value.polivalente,
      castracao: this.anamnese.value.castracao,
      recusa: this.anamnese.value.motivoCastracao,
      vermifugacao: this.anamnese.value.vermifugo,
      ectoparasiticida: this.anamnese.value.ectoparasiticida,
      tipoParasiticida: this.anamnese.value.tipoEcto,
suplemento: this.anamnese.value.suplemento,
      motivo: this.anamnese.value.motivoSuplemento,
      inicio: this.anamnese.value.inicioSuplemento,
doenca: this.doencas,
medic: this.rec,
APLIC: this.apli,
data: this.formatDateBD(),
        exame: this.pexms,
cirurgia: this.pcir,
especialista: this.pesp,
evolucao: this.tipoAtendimento.value.evolucao,
          detalhes: this.tipoAtendimento.value.detalhes
});
  }






}
