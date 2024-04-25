import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDates = JSON.parse(localStorage.getItem('userDates') ?? '{}');
  funcDates = JSON.parse(localStorage.getItem('funcDates') ?? '{}');

  constructor() { }

  ngOnInit(): void {
    console.log(this.userDates, this.funcDates)
  }

}
