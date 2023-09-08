import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	username: string;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authService.userSubject$.subscribe((user) => {
			if (user) {
				this.username = user.displayName;
			}
		});
	}

	get isLoggedIn(): boolean {
		return this.authService.isLoggedIn;
	}

	logout() {
		this.authService.logout();
	}
}
