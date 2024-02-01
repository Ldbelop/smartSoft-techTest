import { Component, ViewChild, ElementRef } from '@angular/core';
import * as Papa from 'papaparse'

@Component({
  selector: 'app-csv-read',
  templateUrl: './csv-read.component.html',
  styleUrl: './csv-read.component.css'
})
export class CsvReadComponent {

  @ViewChild('dropZone') dropZoneElement!: ElementRef

  onDrop(event: DragEvent){
    event.preventDefault()

    const file:any = event.dataTransfer?.files[0];

    if(file){
      if(this.isTypeCSV(file)){
        this.parseCSVFile(file)
      } else{
        alert('Tipo de archivo no permitido') // implementar con sweet alert 2
      }
    }
  }

  parseCSVFile(file: File): void {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        const csvString = event.target.result as string;
        Papa.parse(csvString, {
          complete: (results) => {
            console.log('Parsed CSV data:', results.data);
          },
          error: (error: any) => {
            console.error('Error parsing CSV:', error.message);
          },
        });
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };

    reader.readAsText(file);
  }

  onDragOver(event: DragEvent){
    event.preventDefault()
    this.dropZoneElement.nativeElement.style.border = '2px solid #9DBCCD';
  }

  onDragLeave(event: DragEvent){
    event.preventDefault()
    this.dropZoneElement.nativeElement.style.border = '2px dashed #9DBCCD';
  }

  isTypeCSV(file: File){
    return file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv');
  }
}
