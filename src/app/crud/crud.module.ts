import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudRoutingModule } from './crud-routing.module';
import { JsonCrudComponent } from './json-crud/json-crud.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudMethodService } from './services/crud-method.service';
import { SweetAlertService } from '../services/sweet-alert.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  providers: [
    CrudMethodService,
    SweetAlertService
  ],
  declarations: [
    JsonCrudComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    CrudRoutingModule
  ]
})
export class CrudModule { }
