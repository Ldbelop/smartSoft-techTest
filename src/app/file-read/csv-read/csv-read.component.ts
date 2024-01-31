import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-csv-read',
  templateUrl: './csv-read.component.html',
  styleUrl: './csv-read.component.css'
})
export class CsvReadComponent {

  @ViewChild('dropZone') dropZoneElement!: ElementRef

  onDrop(event: DragEvent){
    event.preventDefault()

    const file = event.dataTransfer?.files[0];

    if(file){
      if(this.isTypeCSV(file)){
        // codigo a implementar de leída de pene
      } else{
        alert('Tipo de archivo no permitido') // implementar con sweet alert 2
      }
    }
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
