import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class isLoggedOutGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('user') == null) {
      return true;
    } else {
      this.router.navigate(['/fileRead']);
      return false;
    }
  }
}
