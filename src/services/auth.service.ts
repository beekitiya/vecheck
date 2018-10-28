import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {App} from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class AuthService {
	private user: firebase.User;

	constructor(public afAuth: AngularFireAuth, public app: App,private readonly afs: AngularFirestore,) {
		afAuth.authState.subscribe(user => {
		if(user){
		this.user = user;
        this.afs.collection('Users').doc(user.uid).collection('Cars').ref.get()
        .then( (query)=>

          {
            if(query.size>0){
                this.app.getActiveNav().push('MainPage');
            }else{
                this.app.getActiveNav().push('StartQuestionnairePage');
            }

		});
	}else{
		this.app.getActiveNav().push('LoginPage');
	}
    });
	}

    signInWithEmail(credentials) {
        console.log('Sign in with email');
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,credentials.password);
    }

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

	signOut() {
		return this.afAuth.auth.signOut();
	}

	logOut() : Promise {
      	return new Promise((resolve, reject) => {
        	firebase
        	.auth()
        	.signOut()
        	.then(() => {
           		resolve(true);
        	})
        	.catch((error : any) => {
           		reject(error);
        	});
      	});
   	}

	getcurrentUser(){
		return this.afAuth.auth.currentUser;
  	}

	get authenticated(): boolean {
  		return this.user !== null;
	}

}
