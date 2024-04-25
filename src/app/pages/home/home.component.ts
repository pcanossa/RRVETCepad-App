import { Component, OnInit } from '@angular/core';
import { CommonAppService } from 'src/app/services/common-app.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private app:CommonAppService) { }

  ngOnInit(): void {
    this.app.localiza();
  }



}
