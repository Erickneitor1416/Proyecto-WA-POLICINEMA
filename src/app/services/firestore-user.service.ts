import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
	providedIn: 'root'
})
export class FirestoreUserService {
	constructor(private firestore: AngularFirestore) {}

	updateUser(email: string, country: string, id: string) {
		const userRef = this.firestore.collection('users').doc(id);
		return userRef
			.update({
				email: email,
				country: country
			})
			.catch((error) => {
				console.error('Error updating user:', error);
			});
	}
}
