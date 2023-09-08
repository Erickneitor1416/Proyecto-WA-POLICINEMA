import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-register-screen',
	templateUrl: './register-screen.component.html',
	styleUrls: ['./register-screen.component.scss']
})
export class RegisterScreenComponent implements OnInit {
	error: string | null;
	registerForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.registerForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', [Validators.required, Validators.minLength(8)]],
			confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
		});
		this.registerForm
			.get('confirmPassword')
			?.setValidators([
				Validators.required,
				Validators.minLength(8),
				this.matchPassword.bind(this)
			]);
	}
	matchPassword(control: FormControl): ValidationErrors | null {
		const password = this.registerForm.get('password')?.value;
		const confirmPassword = control.value;

		if (password === confirmPassword) {
			return null;
		} else {
			return { mismatch: true };
		}
	}

	submit() {
		if (this.registerForm.valid) {
			this.authService
				.registerUser(
					this.registerFormControls.firstName.value,
					this.registerFormControls.lastName.value,
					this.registerFormControls.email.value,
					this.registerFormControls.password.value
				)
				.catch((err) => {
					console.log('Error: ', err);
					this.error = 'Error durante el registro';
				});
		}
	}

	get registerFormControls() {
		return this.registerForm.controls;
	}
}
