import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-adm-recupera',
  templateUrl: './adm-recupera.component.html',
  styleUrls: ['./adm-recupera.component.css']
})
export class AdmRecuperaComponent implements OnInit {
  dadosLogin:any[] = [];
  public msgError!:string | null;
  public msgSucess!:string | null;
  public enviado = false;
  public registroSenha = false;
  codigoValid: boolean = false;
  codigoEmail:any = null;
  registroOK:any = null;

  public formAuth: FormGroup = this.formBuilder.group(
    {
      cpf: ['',[Validators.required]],
      senha: [''],
      repeatSenha: [''],
      codigo: [''],
    }
  )


  constructor(private formBuilder: FormBuilder, private app: FuncionarioService, private router: Router) { }

  ngOnInit(): void {
  }

  public async submitForm() {
    this.msgError = null;
    this.enviado = true;
    this.codigoValid = true;
    this.msgSucess = `Um email será enviado para seu endereço de email cadastrado, siga as instruções informadas.
    O email pode demorar alguns minutos para ser recebido.`;
    if(this.formAuth.valid) {
      this.app.enviaEmailCol({
        cpf: this.formAuth.value.cpf,
      })
      .subscribe ({
        next: ((res)=> {
          this.codigoEmail = res;
          console.log(this.codigoEmail);
        }),
        error: ((err)=> {
          this.msgError = `Tivemos o seguinte problema no envio do email: ${err}`;
          this.enviado=false;
        })
      })
    }
  }

  public async validaCodigo() {
    if (this.formAuth.value.codigo === this.codigoEmail) {
      this.registroSenha = true;
      this.msgSucess = null;
      this.codigoValid = false;
    }
  }

  public async registroNovaSenha() {
    if (this.formAuth.value.senha==='') {
      this.msgError = "É necessário informar uma nova senha";
    }
    if (this.validatePassword(this.formAuth.value.senha)) {
      if (this.comparePassword(this.formAuth.value.senha, this.formAuth.value.repeatSenha)) {
        this.msgError = null;
        this.app.registraNovaSenha({cpf: this.formAuth.value.cpf, senha: this.formAuth.value.senha})
        .subscribe({
          next: ((res) => {
            this.registroOK = res.message;
           this.msgSucess = res.message;
          }),
          error: ((err)=> {
            this.msgError = err.message;
          })
        }
        )
      } else {
        this.msgError = "As senhas não coincidem"
      }

    } else {
      this.msgError = 'A senha deve conter pelo menos: 6 caracteres, 1 letra maiúscula, 1 letra minúscula e um número'
    }
  }

  validatePassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  }

  comparePassword(password: string, repeatPassword: string): boolean {
    if (password === repeatPassword) {
      return true;
    } else {
      return false;
    }
  }


}
