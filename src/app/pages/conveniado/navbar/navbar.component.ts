import { Component, OnInit } from '@angular/core';
import { ClientesAppService } from 'src/app/services/clientes-app.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private app: ClientesAppService, private auth: AuthGuardService) { }

  ngOnInit(): void {
  }

  limparLocalStorage() {
    localStorage.clear();
  }

}
