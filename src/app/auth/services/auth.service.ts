import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login( email: string){
    localStorage.setItem('user' ,JSON.stringify({
      email: btoa(email),
    }))
  }

  logout(){
    localStorage.removeItem('user')
  }
}
