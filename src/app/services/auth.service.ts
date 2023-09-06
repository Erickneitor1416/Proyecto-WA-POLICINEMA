import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  userSubject$ = new Subject<any>();

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.userSubject$.next(this.userData);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  storeUserDate(user: any) {
    this.firestore
      .collection('users')
      .doc(user.uid)
      .set({
        email: user.email,
        uid: user.uid,
        emailverified: user.emailVerified,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loginWithEmailAndPassword(email: string, password: string) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(JSON.stringify(userCredential));
        this.router.navigate(['/']);
        this.storeUserDate(userCredential.user);
        return userCredential.user;
      });
  }
  sendVerificationMail() {
    return this.fireAuth.currentUser.then((u: any) =>
      u.sendEmailVerification()
    );
  }

  get user(): any {
    return this.userData;
  }

  registerUser(email: string, password: string) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.storeUserDate(userCredential.user);
        this.sendVerificationMail();
        this.router.navigate(['/verify-user']);
      });
  }
  logout() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
}
