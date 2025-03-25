import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function downloadPDF(element: HTMLElement, filename: string) {
  try {
    const canvas = await html2canvas(element, {
      scale: window.devicePixelRatio || 2, // Ensures high resolution
      useCORS: true, // Fixes potential image loading issues
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      ignoreElements: (el) => el.tagName === 'IFRAME',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let yPosition = 0;

    while (yPosition < imgHeight) {
      pdf.addImage(imgData, 'PNG', 0, yPosition, imgWidth, imgHeight);
      yPosition += pageHeight;

      if (yPosition < imgHeight) {
        pdf.addPage();
      }
    }

    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}
