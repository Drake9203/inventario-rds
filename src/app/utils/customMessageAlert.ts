import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomMessageAlert {
  constructor() {}

  /** Funcion para idenficiar cuando un objeto es diferente a otro */
  actionMsg(actionMsg: string, title: string, icon: SweetAlertIcon) {
    Swal.fire({
      title: title,
      text: actionMsg,
      icon: icon,
      showCancelButton: false,
      confirmButtonColor: 'rgb(3, 142, 220)',
      confirmButtonText: 'OK',
    });
  }
}

