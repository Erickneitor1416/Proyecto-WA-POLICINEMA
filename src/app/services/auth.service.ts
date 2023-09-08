import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	userData: any;

	userSubject$ = new Subject<any>();

	constructor(
		public authFire: AngularFireAuth,
		public route: Router,
		public firestore: AngularFirestore
	) {
		this.authFire.authState.subscribe((user) => {
			if (user) {
				this.userData = user;
				this.userSubject$.next(this.userData);
				localStorage.setItem('user', JSON.stringify(this.userData));
			} else {
				this.userSubject$.next(null);
				localStorage.removeItem('user');
			}
		});
	}

	loginWithEmail(email: string, password: string) {
		return this.authFire
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				localStorage.setItem('user', JSON.stringify(result.user));

				if (result.user && result.user.emailVerified) {
					this.storeUserData(result.user);
					this.route.navigate(['/home']);
				} else {
					console.error('User is not verified.');
				}
			})
			.catch((error) => {
				console.error('Login error:', error);
			});
	}

	registerUser(firstName: string, lastName: string, email: string, password: string) {
		return this.authFire.createUserWithEmailAndPassword(email, password).then((result) => {
			const user = result.user;

			console.log(user);

			if (user !== null) {
				return user
					.updateProfile({
						displayName: `${firstName} ${lastName}`
					})
					.then(() => {
						this.storeUserData(user);
						this.sendVerificationEmail();
						this.route.navigate(['/login'], { queryParams: { registered: 'true' } });
					});
			} else {
				return null;
			}
		});
	}

	sendVerificationEmail() {
		return this.authFire.currentUser.then((u: any) => u.sendEmailVerification());
	}

	get userInfo(): any {
		return this.userData;
	}

	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem('user')!);
		return user !== null && user.emailVerified !== false;
	}

	logout() {
		this.authFire.signOut().then(() => {
			localStorage.removeItem('user');
			this.route.navigate(['/login']);
		});
	}

	updatePassword(oldPassword: string, newPassword: string, email: string) {
		return this.authFire
			.signInWithEmailAndPassword(email, oldPassword)
			.then(() => {
				// User is signed in, now we can update the password.
				this.authFire.currentUser
					.then((u: any) => u.updatePassword(newPassword))
					.catch((error: any) => {
						console.log(error);
					});
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log('Error code: ' + errorCode);
				console.log('Error message: ' + errorMessage);
				throw new Error(error);
			});
	}
	storeUserData(user: any) {
		this.firestore
			.collection('users')
			.doc(user.uid)
			.set({
				uid: user.uid,
				email: user.email,
				emailVerified: user.emailVerified
			})
			.then((result) => {
				console.log(JSON.stringify(result));
			});
	}
}
