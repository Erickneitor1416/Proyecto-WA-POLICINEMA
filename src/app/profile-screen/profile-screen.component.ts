import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FirestoreUserService } from '../services/firestore-user.service';
import { LocationService } from '../services/location.service';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-profile-screen',
	templateUrl: './profile-screen.component.html',
	styleUrls: ['./profile-screen.component.scss']
})
export class ProfileScreenComponent implements OnInit, OnDestroy {
	updateForm: FormGroup;
	passwordForm: FormGroup;
	locationSubscription: Subscription;
	isClosed = true;
	onClickCountry = false;
	isSuccess = false;
	isPasswordSuccess = false;
	userData = JSON.parse(localStorage.getItem('user')!);

	constructor(
		private fb: FormBuilder,
		private fs: FirestoreUserService,
		private ls: LocationService,
		private auth: AuthService
	) {}
	ngOnDestroy(): void {
		this.locationSubscription && this.locationSubscription.unsubscribe();
	}
	ngOnInit(): void {
		this.updateForm = this.fb.group({
			email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
			country: new FormControl('', [Validators.required])
		});
		this.passwordForm = this.fb.group({
			oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
			newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
			confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
		});
		this.passwordForm
			.get('confirmPassword')
			?.setValidators([
				Validators.required,
				Validators.minLength(8),
				this.matchPassword.bind(this)
			]);
	}
	matchPassword(control: FormControl): ValidationErrors | null {
		const newPassword = this.passwordForm.get('newPassword')?.value;
		const confirmPassword = control.value;

		if (newPassword === confirmPassword) {
			return null;
		} else {
			return { mismatch: true };
		}
	}
	resetFormUser() {
		this.updateForm.reset();
		this.onClickCountry = false;
		this.updateForm.controls.country.enable();
	}
	resetFormPassword() {
		this.passwordForm.reset();
	}

	obtenerPais() {
		this.locationSubscription = this.ls.getUserCountry().subscribe({
			next: (country) => {
				this.updateForm.controls.country.setValue(country);
				this.updateForm.controls.country.disable();
				this.onClickCountry = true;
			},
			error: (error) => {
				console.log(error);
			}
		});
	}

	onSubmitUser() {
		if (this.updateForm.valid) {
			const userId = this.userData.uid;
			this.fs
				.updateUser(this.email, this.country, userId)
				.then(() => {
					this.isClosed = false;
					this.isPasswordSuccess = true;
					// eslint-disable-next-line angular/timeout-service
					setTimeout(() => {
						this.isClosed = true;
						this.isPasswordSuccess = false;
					}, 2000);
				})
				.catch((error: any) => {
					console.log(error, 'error');
					this.isClosed = false;
					this.isSuccess = false;
				});
		}
	}
	onSubmitPassword() {
		const userEmail = this.userData.email;
		if (this.passwordForm.valid) {
			this.auth
				.updatePassword(
					this.passwordForm.controls.oldPassword.value,
					this.passwordForm.controls.newPassword.value,
					userEmail
				)
				.then(() => {
					this.isClosed = false;
					this.isPasswordSuccess = true;
					// eslint-disable-next-line angular/timeout-service
					setTimeout(() => {
						this.isClosed = true;
						this.isPasswordSuccess = false;
					}, 2000);
				})
				.catch((error: any) => {
					console.log(error);
					this.isClosed = false;
					this.isPasswordSuccess = false;
					// eslint-disable-next-line angular/timeout-service
					setTimeout(() => {
						this.isClosed = true;
					}, 2000);
				});
		}
	}

	get email() {
		return this.updateForm.controls.email.value;
	}
	get password() {
		return this.updateForm.controls.password.value;
	}
	get country() {
		return this.updateForm.controls.country.value;
	}
}
