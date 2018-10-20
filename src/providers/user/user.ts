import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Api } from '../api/api';

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
export class User {
  _user: any;
  headers = new HttpHeaders({
    "Client-Service": "mobile",
    "Access-Control-Allow-Origin" : "*"
  });
    // headers : {
    //   "Client-Service": "mobile",
    //   "Auth-Key": "Um/cPzYJ8NwsCtELWEeDP8BjAHdUveXZ5FmtFWShqm6co2RgHXswMqFDLNgaViUPyoE6OYKTrU0EVdWn+5L7gw=="
    // }

  constructor(public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    // let headers = new HttpHeaders({
    //   "Client-Service": "mobile",
    //   "Auth-Key": "Um/cPzYJ8NwsCtELWEeDP8BjAHdUveXZ5FmtFWShqm6co2RgHXswMqFDLNgaViUPyoE6OYKTrU0EVdWn+5L7gw=="
    // });
    let seq = this.api.post('authen/login', accountInfo, { headers : this.headers }).share();
    //let seq = this.api.post('authen/login', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('authen/signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
