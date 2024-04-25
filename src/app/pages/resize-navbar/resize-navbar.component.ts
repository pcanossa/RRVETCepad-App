import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-resize-navbar',
  templateUrl: './resize-navbar.component.html',
  styleUrls: ['./resize-navbar.component.css']
})
export class ResizeNavbarComponent implements OnInit {

  elementoRemovivel: any;
  dropMenu: any;

  constructor() { }

  @HostListener('window:load', ['$event'])
  onLoad(event:any) {

    this.elementoRemovivel = document.querySelector('.itens-menu');
    this.dropMenu = document.querySelector('.accordion-item');

  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if (window.innerWidth < 450) {
      this.elementoRemovivel.remove();
    } else {
      document.body.appendChild(this.elementoRemovivel);
      this.dropMenu.remove();
    }
  }

  ngOnInit(): void {
  }


}
