import { Component, OnInit } from '@angular/core';
import { LoginData } from '../Interfaces/Interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login-screen',
	templateUrl: './login-screen.component.html',
	styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
	error: string = '';

	form: LoginData;

	loginForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		/* this.form = {
      email: '',
      password: '',
      rememberMe: false
    }; */
		this.loginForm = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', [Validators.required, Validators.minLength(7)]]
		});
	}

	submit() {
		if (this.loginForm.valid) {
			this.authService
				.loginWithEmail(this.loginFormControls.email.value, this.loginFormControls.password.value)
				.catch((err) => {
					this.error = 'Usuario/Contraseña incorrecta';
				});
		}
	}

	get loginFormControls() {
		return this.loginForm.controls;
	}
}
