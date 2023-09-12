import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReviewsScreenComponent } from './reviews-screen.component';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { NgxStarsComponent } from 'ngx-stars';
import { ClarityModule } from '@clr/angular';
import { AddReviewBodyComponent } from '../add-review-body/add-review-body.component';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('ReviewsScreenComponent', () => {
	let component: ReviewsScreenComponent;
	let fixture: ComponentFixture<ReviewsScreenComponent>;
	class AuthServiceMock {}
	class AngularFireAuthMock {}

	const mockActivatedRoute = {
		params: of({ id: 248 })
	};

	const firestoreMock = {
		collection: () => ({
			valueChanges: () => {
				return of([
					{
						date: '09/09/2023',
						feedback: 'Interesting',
						movieId: 238,
						rating: 4,
						reviewTitle: 'Nice',
						username: 'nicolas barragan'
					}
				]);
			}
		})
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, ClarityModule, ReactiveFormsModule],
			declarations: [ReviewsScreenComponent, NgxStarsComponent, AddReviewBodyComponent],
			providers: [
				ReviewsScreenComponent,
				{ provide: AngularFirestore, useValue: firestoreMock },
				{ provide: ActivatedRoute, useValue: mockActivatedRoute },
				{ provide: AuthService, useClass: AuthServiceMock },
				{ provide: AngularFireAuth, useClass: AngularFireAuthMock }
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ReviewsScreenComponent);
		component = fixture.componentInstance;

		component.movie = {
			poster_path: 'https://image.tmdb.org/t/p/w500/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg',
			adult: false,
			overview:
				'In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York.',
			release_date: '1974-12-20',
			backdrop_path: 'https://image.tmdb.org/t/p/w500/AbbnCZn4q02y3kIJWy4eW7u6zrC.jpg',
			genres: [],
			id: 238,
			original_language: 'en',
			original_title: 'The Godfather: Part II',
			popularity: 41.994,
			title: 'The Godfather: Part II',
			video: false,
			vote_average: 8.6,
			vote_count: 10798
		};
		spyOn(localStorage, 'getItem').and.returnValue(
			JSON.stringify({ displayName: 'Usuario Simulado' })
		);

		fixture.detectChanges();
	});

	it('should fetch reviews data', fakeAsync(() => {
		const movieId = 238;

		component.getReviewsByMovieId(movieId);

		tick();

		expect(component.reviews).toEqual([
			{
				date: '09/09/2023',
				feedback: 'Interesting',
				movieId: 238,
				rating: 4,
				reviewTitle: 'Nice',
				username: 'nicolas barragan'
			}
		]);
	}));
});
