import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@NgModule({
  providers: [
    AuthService,
  ],
  declarations: [
    LoginComponent,
  ],
  imports: [
    MatProgressSpinner,
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AuthModule { }
