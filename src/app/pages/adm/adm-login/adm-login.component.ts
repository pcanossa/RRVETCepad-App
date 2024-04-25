import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';


@Component({
  selector: 'app-adm-login',
  templateUrl: './adm-login.component.html',
  styleUrls: ['./adm-login.component.css']
})
export class AdmLoginComponent implements OnInit {

  public msgError!:string;


  public formAuth: FormGroup = this.formBuilder.group(
    {
      cpf: ['',[Validators.required]],
      senha: ['',[Validators.required]],
    }
  )

  constructor(private formBuilder: FormBuilder, private app: FuncionarioService, private router: Router) { }

  ngOnInit(): void {
  }

  public async submitForm() {
    if(this.formAuth.valid) {
      this.app.authService({
        cpf: this.formAuth.value.cpf,
        senha: this.formAuth.value.senha
      })
      .subscribe ({
        next: ((res)=> {
          this.router.navigate(['/app'])
        }),
        error: (err)=> (this.msgError = err)
      })
    }
  }

}
