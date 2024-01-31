import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsvReadComponent } from './csv-read/csv-read.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'csvRead', component: CsvReadComponent},
      { path: '**', redirectTo: 'csvRead'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileReadRoutingModule { }
