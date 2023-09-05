import { Component, OnInit } from '@angular/core';
import { LoginData } from '../Interfaces/Interfaces';

@Component({
	selector: 'app-login-screen',
	templateUrl: './login-screen.component.html',
	styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
	form: LoginData; 
	constructor() {}
	ngOnInit(): void {
    this.form = {
      email: '',
      password: '',
      rememberMe: false
    };
  }
}
