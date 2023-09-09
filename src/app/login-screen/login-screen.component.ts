import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-login-screen',
	templateUrl: './login-screen.component.html',
	styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
	error: string = '';

	loginForm: FormGroup;
	isRegistered = false;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: ActivatedRoute
	) {}

	ngOnInit(): void {
		if (
			this.router.snapshot.queryParams.registered !== undefined &&
			this.router.snapshot.queryParams.registered === 'true'
		) {
			this.isRegistered = true;
			// eslint-disable-next-line angular/timeout-service
			setTimeout(() => {
				this.isRegistered = false;
			}, 3000);
		}
		this.loginForm = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', [Validators.required, Validators.minLength(8)]]
		});
	}

	submit() {
		if (this.loginForm.valid) {
			this.authService
				.loginWithEmail(this.loginFormControls.email.value, this.loginFormControls.password.value)
				.catch((err) => {
					this.error = 'Usuario/Contraseña incorrecta';
					setTimeout(() => {
						this.error = '';
					}, 4000);
					console.log('error: ', err);
				});
		}
	}

	get loginFormControls() {
		return this.loginForm.controls;
	}
}
