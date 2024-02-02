import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileReadRoutingModule } from './file-read-routing.module';
import { CsvReadComponent } from './csv-read/csv-read.component';
import { SweetAlertService } from '../services/sweet-alert.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  providers: [
    SweetAlertService
  ],
  declarations: [
    CsvReadComponent
  ],
  imports: [
    CommonModule,
    FileReadRoutingModule,
    MatProgressSpinnerModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class FileReadModule { }
