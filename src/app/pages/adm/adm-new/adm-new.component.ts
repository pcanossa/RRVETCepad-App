import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-adm-new',
  templateUrl: './adm-new.component.html',
  styleUrls: ['./adm-new.component.css']
})
export class AdmNewComponent implements OnInit {

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
          this.app.registraNovaSenha({
            cpf: this.formAuth.value.cpf,
            senha: this.formAuth.value.senha,
          })
          .subscribe ({
            next: ((res)=> {
              console.log(this.formAuth.value.novaSenha);
              console.log(res);
              this.scsMessage = res
              this.router.navigate(['/app'])
            }),
            error: (err)=> (this.msgError = err)
          })
        }
      } else {
         this.msgError = 'As senhas não coincidem'
    }
  }

}
