import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { isLoggedOutGuard } from './guards/is-logged-out.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( module => module.AuthModule),
    canActivate: [isLoggedOutGuard]
  },
  {
    path: 'fileRead',
    loadChildren: () => import('./file-read/file-read.module').then( module => module.FileReadModule),
    canActivate: [isLoggedInGuard]
  },
  {
    path: 'crud',
    loadChildren: () => import('./crud/crud.module').then( module => module.CrudModule),
    canActivate: [isLoggedInGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
