import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  login( email: string){
    localStorage.setItem('user' ,JSON.stringify({
      email: btoa(email),
    }))
    this.router.navigate(["/fileRead"])
  }

  logout(){
    localStorage.removeItem('user')
    this.router.navigate(["/auth"])
  }
}
