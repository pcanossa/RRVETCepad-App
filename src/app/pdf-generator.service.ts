import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }


  public generatePDF() {
    const doc = new jsPDF();
    const totalPages = doc.internal.pages;
    let renderedPages = 0;

    const htmlContent = document.documentElement;
    const pageData = doc.internal.pageSize;

    const contentWidth = pageData.width - 40; // 40 is the margin on each side
    const contentHeight = htmlContent.offsetHeight * contentWidth / htmlContent.offsetWidth;
    let position = 0;

    htmlContent.style.pageBreakBefore = 'auto';

    const printPage = (pageContent: any) => {
      doc.addPage();
      doc.text('Page ' + (renderedPages + 1), 20, 20);

      doc.addImage(pageContent, 'PNG', 20, 40, contentWidth, contentHeight);
      renderedPages++;
    };

    const createPage = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const scale = contentWidth / htmlContent.offsetWidth;

      canvas.width = contentWidth;
      canvas.height = contentHeight;

      context?.scale(scale, scale);

      htmlContent.style.transform = 'scale(' + scale + ')';
      htmlContent.style.transformOrigin = 'top left';

      html2canvas(htmlContent, {
        canvas: canvas,
        scrollY: -window.scrollY,
        useCORS: true
      }).then((canvas: any) => {
        const pageContent = canvas.toDataURL('image/png', 1.0);
        printPage(pageContent);

        if (renderedPages < totalPages.length) {
          createPage();
        } else {
          doc.save('documento.pdf');
        }
      });
    };

    createPage();
  }
}
function html2canvas(htmlContent: HTMLElement, arg1: { canvas: HTMLCanvasElement; scrollY: number; useCORS: boolean; }): any {
  throw new Error('Function not implemented.');
}

