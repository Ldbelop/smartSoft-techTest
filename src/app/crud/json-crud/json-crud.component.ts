import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-json-crud',
  templateUrl: './json-crud.component.html',
  styleUrl: './json-crud.component.css'
})
export class JsonCrudComponent {
  showHamburguer: boolean = false;

  constructor(private authService: AuthService){}

  logout(){
    this.authService.logout()
  }
}
