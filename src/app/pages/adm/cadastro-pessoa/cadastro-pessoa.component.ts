import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { HttpHeaders } from '@angular/common/http';
import { format } from 'date-fns';


@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css'],
})
export class CadastroPessoaComponent implements OnInit {

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

  public async cadastraCliente() {
    return new Promise(async (resolve, reject) => {
    const dataHora = this.getDateHours();
    this.app.registraCliente({
      nome: this.dadosPessoa.value.nome,
      cpf: this.dadosPessoa.value.cpf,
      cep: this.dadosPessoa.value.cep,
      rua: this.dadosPessoa.value.rua,
      bairro: this.dadosPessoa.value.bairro,
      numero: this.dadosPessoa.value.numero,
      cidade: this.dadosPessoa.value.cidade,
      estado: this.dadosPessoa.value.estado,
      data_nascimento: this.getBirthDate(),
      telefone: this.dadosPessoa.value.telefone,
      tipo: this.dadosPessoa.value.tipo
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

  public async geraCobrancaVista(): Promise<any> {
    return new Promise(async (resolve, reject)=> {
      try {
        await this.app.catchToken().subscribe({
          next: ((res)=> {
            console.log(res.accessToken);
            this.LyToken = new HttpHeaders({
              'Authorization': `Bearer ${res.accessToken}`
            });
            console.log(this.LyToken);
            this.httpToken = {
              headers: this.LyToken
            }
            console.log(this.httpToken);
          }),
          error: ((err)=> {
            this.msgError = err;
            reject(err);
          })
        })
        try {
          const payload = {
          client: {
            type: 'pf',
            name: this.dadosPessoa.value.nome,
            treatmentPronoun: 'you',
            cpfCnpj: this.dadosPessoa.value.cpf,
            email: this.dadosPessoa.value.email,
            cellphone: this.dadosPessoa.value.telefone,
            address: {
              street: this.dadosPessoa.value.rua,
              zone: this.dadosPessoa.value.bairro,
              city: this.dadosPessoa.value.cidade,
              state: this.dadosPessoa.value.estado,
              number: this.dadosPessoa.value.numero,
              zip: this.dadosPessoa.value.cep,
              complement: this.dadosPessoa.value.complemento
            }
          },
          items: [
            {
              name: "Plano Valor à Vista",
              quantity: this.dadosAquisicao.value.quantidade,
              value: 20000
            }
          ],
          dueDate: this.getDateHours(),
          paymentMethods: {
            pix: {
                enable: true
            },
            boleto: {
                enable: true,
                dueDateDays: 15
            },
            creditCard: {
                enable: false,
                maxParcels: 1
            }
          },
          _billingRuleId: "648ef3f685d0ca000b63faba",
          cancelOverdue: true
        };
          await this.app.invoices(payload, this.httpToken).subscribe({
            next: ((res)=> {
              this.urlId = res._id;
              resolve(this.urlId)
            }),
            error: ((err)=> {
              this.msgError = err
            })
          })
        } catch (err: any) {
          reject(this.msgError)
        }

      } catch {
        reject(this.msgError);
      }
    })
  }

  calculaParcelas(quantidade: number) {
    const valor = (238.80 * quantidade);
    const valorFormatado = Math.round(valor * 100);
    return valorFormatado;
  }


  calculaDataVencimento() {
    const date = new Date();
    const dia = date.setDate(date.getUTCDate() + 20);
    const formatoDataHora = 'yyyy-MM-dd HH:mm:ss';
    const dataHoraFormatada = format(dia, formatoDataHora);

    return dataHoraFormatada

  }
  public async catchToken () {
    return new Promise(async (resolve, reject) => {
      await this.app.catchToken().subscribe({
        next: ((res)=> {
          this.LyToken = new HttpHeaders({
            'Authorization': `Bearer ${res.accessToken}`
          });
          this.httpToken = {
            headers: this.LyToken
          }

          resolve(this.httpToken)
        }),
        error: ((err)=> {
          this.msgError = err;
          reject(err);
        })
      })
    })
  }

  public async geraCarne () {
    return new Promise(async (resolve, reject)=> {
          const payload = {
            client: {
              type: 'pf',
              name: this.dadosPessoa.value.nome,
              treatmentPronoun: 'you',
              cpfCnpj: this.dadosPessoa.value.cpf,
              email: this.dadosPessoa.value.email,
              cellphone: this.dadosPessoa.value.telefone,
              address: {
                street: this.dadosPessoa.value.rua,
                zone: this.dadosPessoa.value.bairro,
                city: this.dadosPessoa.value.cidade,
                state: this.dadosPessoa.value.estado,
                number: this.dadosPessoa.value.numero,
                zip: this.dadosPessoa.value.cep,
                complement: this.dadosPessoa.value.complemento
              }
            },
            totalValue: this.calculaParcelas(this.dadosAquisicao.value.quantidade),
            startAt: this.calculaDataVencimento(),
            description: `Plano Parcelado 12x - Quantidade: ${this.dadosAquisicao.value.quantidade}`,
            paymentMethods: {
              pix: {
                  enable: true
              },
              boleto: {
                  enable: true
              },
              creditCard: {
                  enable: false
              }
            },
            mulctAndInterest: {
              enable: true,
              mulct: {
              type: "percentage",
              value: 2
              },
              interest: {
              type: "percentage",
              value: 0.033
              }
            },
            parcels: 12,
            _billingRuleId: "648ef3f685d0ca000b63faba"
          };
          await this.app.installment(payload, this.httpToken).subscribe({
            next: ((res)=> {
              this.urlId = res._id;
              resolve(this.urlId)
            }),
            error: ((err)=> {
              this.msgError = err;
              reject(this.msgError);
            })
          });
      })
  }

  async criaCobranca () {
    this.retornaEndereco();
    if (this.dadosPessoa.valid) {
      this.carregando= true;
      try {
        await this.cadastraCliente();

        this.carregando = false;

      } catch (err) {
        this.carregando = false;
        return console.error(err);
      }
    } else {
      this.msgError = 'Todos os campos com * são obrigatórios'
    }
    }

    retornaEndereco() {
      if (this.end.rua != '' && this.end.bairro != '') {
        this.dadosPessoa.value.rua = this.end.rua;
        this.dadosPessoa.value.bairro = this.end.bairro;
      }
      this.dadosPessoa.value. cidade = this.end.cidade;
      this.dadosPessoa.value.estado = this.end.uf;
    }

    teste() {
      this.retornaEndereco();
      console.log(this.dadosPessoa.value);
      console.log(this.end);
    }

}
