import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileReadRoutingModule } from './file-read-routing.module';
import { CsvReadComponent } from './csv-read/csv-read.component';


@NgModule({
  declarations: [
    CsvReadComponent
  ],
  imports: [
    CommonModule,
    FileReadRoutingModule
  ]
})
export class FileReadModule { }
