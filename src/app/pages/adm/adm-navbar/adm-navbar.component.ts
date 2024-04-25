import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adm-navbar',
  templateUrl: './adm-navbar.component.html',
  styleUrls: ['./adm-navbar.component.css']
})
export class AdmNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  limparLocalStorage() {
    localStorage.clear();
  }
}
