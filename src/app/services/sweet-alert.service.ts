import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
  constructor() { }

  showAlert(title: string, message: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
    });
  }
}
