import { Component, OnInit } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer/src/app/pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {

  pdfSrc:string = '../../../../assets/documents/Contrato plano de saude pet.pdf'

  constructor() { }

  ngOnInit(): void {
  }

}
