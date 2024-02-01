import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonCrudComponent } from './json-crud/json-crud.component';

const routes: Routes = [
  {
  path: '',
  children: [
    { path: 'json', component: JsonCrudComponent},
    { path: '**', redirectTo: 'json'}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
