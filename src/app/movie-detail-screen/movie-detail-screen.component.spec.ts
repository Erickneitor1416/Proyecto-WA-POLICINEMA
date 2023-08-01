import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailScreenComponent } from './movie-detail-screen.component';

describe('MovieDetailScreenComponent', () => {
	let component: MovieDetailScreenComponent;
	let fixture: ComponentFixture<MovieDetailScreenComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MovieDetailScreenComponent]
		});
		fixture = TestBed.createComponent(MovieDetailScreenComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
