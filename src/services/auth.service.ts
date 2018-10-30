import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { App } from "ionic-angular";
import * as firebase from "firebase/app";

@Injectable()
export class AuthService {
  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth, public app: App) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  signInWithEmail(credentials) {
    console.log("Sign in with email");
    return this.afAuth.auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  logOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve(true);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getcurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  get authenticated(): boolean {
    return this.user !== null;
  }
}
