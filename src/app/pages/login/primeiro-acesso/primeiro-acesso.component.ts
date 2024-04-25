import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.css']
})
export class PrimeiroAcessoComponent implements OnInit {

  dadosLogin:any[] = [];
  public msgError!:string;
  public scsMessage!:string;

  public formAuth: FormGroup = this.formBuilder.group(
    {
      cpf: ['',[Validators.required]],
      novaSenha: ['',[Validators.required]],
      senha: ['',[Validators.required]],
    }
  )

  constructor(private formBuilder: FormBuilder, private app: FuncionarioService, private router: Router) { }

  ngOnInit(): void {
  }

  public async submitForm(senha:string, novaSenha:string) {
    if (senha === novaSenha) {
        if(this.formAuth.valid) {
          this.app.primeroAcesso({
            cpf: this.formAuth.value.cpf,
            senha: this.formAuth.value.senha,
            novaSenha: this.formAuth.value.novaSenha
          })
          .subscribe ({
            next: ((res)=> {
              this.scsMessage = res
              this.router.navigate(['/login'])
            }),
            error: (err)=> (this.msgError = err)
          })
        }
      } else {
         this.msgError = 'As senhas não coincidem'
    }
  }

  comparaSenhas (senha:string, repeatSenha:string):boolean {
    if (senha === repeatSenha) {
      return true;
    } else {
      return false;
    }
  }

}
