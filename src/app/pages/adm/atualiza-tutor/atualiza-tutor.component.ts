import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { HttpHeaders } from '@angular/common/http';
import { format } from 'date-fns';

@Component({
  selector: 'app-atualiza-tutor',
  templateUrl: './atualiza-tutor.component.html',
  styleUrls: ['./atualiza-tutor.component.css']
})
export class AtualizaTutorComponent {

  dadosPessoa: FormGroup =  this.formBuilder.group({
    nome: ['', Validators.required],
    cpf: ['', Validators.required],
    telefone: ['', Validators.required],
    cep: ['', Validators.required],
    rua: ['', Validators.required],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    estado: ['', Validators.required],
    nascimento: [''],
    tipo: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: ['sem']
  })

  tipos = [
    'Munícipe',
    'Protetor'
  ];



  dadosAquisicao: FormGroup = this.formBuilder.group({
    quantidade: [1, Validators.required],
    pagamento: ['', Validators.required],
  })
  httpToken: any;

  constructor(private app: FuncionarioService, private formBuilder: FormBuilder, private endereco: EnderecoService) { }

  funcDates = JSON.parse(localStorage.getItem('funcDates') ?? '{}');
  animalDates = JSON.parse(localStorage.getItem('animalDates') ?? '{}');
  email: any;
  cep:string = '';
  cpf: string = '';
  idade: string = '';
  telefone:string = '';
  numero:string = '';
  rg:string = '';
  msgOK: any;
  msgError: any;
  uf: string = '';
  LyToken: any;
  urlId: any;
  carregando: boolean =false;
  bairro: any;
  rua: any;

  end = {
    rua:'',
    bairro:'',
    uf:'',
    cidade: '',

    retornaEndereco(rua:string, bairro:string, uf:string, cidade:string) {
      this.rua =rua;
      this.bairro =bairro;
      this.uf = uf;
      this.cidade = cidade;
    }
  }

  token = JSON.parse(localStorage.getItem('token') ?? '{}');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`
  });

  httpOptions = {
    headers: this.headers
  };





  ngOnInit(): void {

  }

  async consultaCep() {
    if (this.cep !== '') {
      this.endereco.pegaEndereco(this.cep)
    .subscribe({
      next: ((res)=> {
        this.end.retornaEndereco(res.logradouro, res.bairro, res.uf, res.localidade);
        this.dadosPessoa.get('rua')?.setErrors(null);
        this.dadosPessoa.get('bairro')?.setErrors(null);
        this.dadosPessoa.get('cidade')?.setErrors(null);
        this.dadosPessoa.get('estado')?.setErrors(null);
      }),
      error: ((err)=> {this.dadosPessoa.get('cep')?.setErrors({erro: 'CEP Inválido'})})
    })
    }

  }

  validarCPF(cpf: string): any {
    // Remova caracteres não numéricos do CPF
    cpf = cpf.replace(/\D/g, '');

    // Verifique se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      this.dadosPessoa.get('cpf')?.setErrors({erro: 'CPF Inválido'})
      return false;
    }

    // Verifique se todos os dígitos são iguais
    if (/^(\d)\1*$/.test(cpf)) {
      this.dadosPessoa.get('cpf')?.setErrors({erro: 'CPF Inválido'})
      return false;
    }

    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    let digit = (remainder === 10 || remainder === 11) ? '0' : remainder.toString();

    // Verifica o primeiro dígito verificador
    if (digit !== cpf.charAt(9)) {
      this.dadosPessoa.get('cpf')?.setErrors({erro: 'CPF Inválido'})
      return false;
    }
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    digit = (remainder === 10 || remainder === 11) ? '0' : remainder.toString();

    // Verifica o segundo dígito verificador
    if (digit !== cpf.charAt(10)) {
      this.dadosPessoa.get('cpf')?.setErrors({erro: 'CPF Inválido'})
      return false;
    }

    return true;

  }

  retornaCPF() {
    console.log(this.dadosPessoa.value.cpf);
    this.validarCPF(this.cpf);

  }

  verificarIdadeMaiorQue18() {

    if (this.idade !== '') {
      const dataNascimento = new Date(this.idade);
      const hoje = new Date();
      const ano = hoje.getFullYear();
      const anoUser = dataNascimento.getFullYear();
      const idadeUser = ano - anoUser;
      if (idadeUser >= 18) {
        return
      }
      this.dadosPessoa.get('nascimento')?.setErrors({erro: 'Usuário menor de idade'});

    }

  }

  verificaTelefone() {
    console.log(this.telefone);
    const telefoneRegex = /^\d+$/
    const testTelefone = telefoneRegex.test(this.telefone);
    if (!testTelefone) {
      this.dadosPessoa.get('telefone')?.setErrors({erro: 'Telefone inválido'});
      return false;
    }

    if (this.telefone.length > 11 || this.telefone.length < 10) {
      this.dadosPessoa.get('telefone')?.setErrors({erro: 'Telefone inválido'});
      return false;
    }

    return true;
  }



  validaTelefone() {
    this.verificaTelefone();
  }



  validaUF() {

    if (this.uf.length > 2 || typeof this.uf.length !== "string") {

        this.dadosPessoa.get('estado')?.setErrors({erro: 'Formato de UF errado'});

    }

  }

  public getBirthDate(): string {
    const dataHotaAtual = new Date(this.dadosPessoa.value.nascimento);
    const formatoDataHora = 'yyyy-MM-dd';
    const dataHoraFormatada = format(dataHotaAtual, formatoDataHora);

    return dataHoraFormatada;
  }

  public getDateHoursT(): string {
    const dataHotaAtual = new Date();
    const formatoData = 'yyyy-MM-dd';
    const formatoHora = 'HH:mm:ss'
    const dataFormatada = format(dataHotaAtual, formatoData);
    const horaFormatada = format (dataHotaAtual, formatoHora);

    return `${dataFormatada}T${horaFormatada}Z`;
  }

  public getDateNow() {
    const dataHotaAtual = new Date();
    const formatoDataHora = 'yyyy-MM-dd';
    const dataHoraFormatada = format(dataHotaAtual, formatoDataHora);

    return dataHoraFormatada;
  }

  public getDateHours(): string {
    const dataHotaAtual = new Date();
    const formatoDataHora = 'yyyy-MM-dd HH:mm:ss';
    const dataHoraFormatada = format(dataHotaAtual, formatoDataHora);

    return dataHoraFormatada;
  }

  public async alteraTutor() {
    return new Promise(async (resolve, reject) => {
    const dataHora = this.getDateHours();
    this.app.alteraTut({
      nome: this.dadosPessoa.value.nome,
      cpf: this.dadosPessoa.value.cpf,
      cep: this.dadosPessoa.value.cep,
      rua: this.dadosPessoa.value.rua,
      bairro: this.dadosPessoa.value.bairro,
      numero: this.dadosPessoa.value.numero,
      cidade: this.dadosPessoa.value.cidade,
      estado: this.dadosPessoa.value.estado,
      telefone: this.dadosPessoa.value.telefone,
      tipo: this.dadosPessoa.value.tipo,
      id: this.animalDates.id
    }, this.httpOptions)
    .subscribe(
      {
        next: ((res)=> {
          this.carregando = false;
          this.msgOK =  res.message;
          resolve(this.msgOK);
        }),
        error: ((err)=> {
          this.msgError = err;
          reject(err);
        })
      }
    )
    });
  }


  calculaDataVencimento() {
    const date = new Date();
    const dia = date.setDate(date.getUTCDate() + 20);
    const formatoDataHora = 'yyyy-MM-dd HH:mm:ss';
    const dataHoraFormatada = format(dia, formatoDataHora);

    return dataHoraFormatada

  }




}



