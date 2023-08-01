import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCardListComponent } from './movies-card-list.component';

describe('MoviesCardListComponent', () => {
	let component: MoviesCardListComponent;
	let fixture: ComponentFixture<MoviesCardListComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MoviesCardListComponent]
		});
		fixture = TestBed.createComponent(MoviesCardListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
