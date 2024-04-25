import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Services
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public msgError!:string;
  isAutenthicated: any = JSON.parse(localStorage.getItem('isAuthenticated') ?? '{}');

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
        senha: this.formAuth.value.senha,
      })
      .subscribe ({
        next: ((res)=> {
          console.log(res);
          console.log(this.msgError);
          this.msgError=res.message;
          this.router.navigate(['/animais']);
        }),
        error: (err)=> (this.msgError = err)
      })
    }
  }


}
