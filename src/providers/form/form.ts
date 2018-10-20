import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class Form {
  constructor(public toastCtrl: ToastController) {}

  openToast(text: any, type: any = 'error') {
    let toast = this.toastCtrl.create({
      message: text,
      position: 'bottom',
      cssClass: type,
      showCloseButton: true,
      closeButtonText: 'ปิด',
      duration: 3000
    });
    toast.present();
  }

  validateForm(data = {}, name = {}) {
    const errors =  Object.keys(data).reduce((o, e, k) => {
      if(data[e].errors) {
        if(o) {
          o += `\n`;
        }

        if(data[e].errors && data[e].errors.required) {
          o += `กรุณากรอก ${name[e]}`;
        } else if(data[e].errors && data[e].errors.pattern) {
          o += `รูปแบบ ${name[e]} ไม่ถูกต้อง`;
        } else {
          o += `${name[e]} ไม่ถูกต้อง`;
        }
      }

      return o;
    }, '');

    this.openToast(errors);

    return errors;
  }
}
