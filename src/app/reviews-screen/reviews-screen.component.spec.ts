import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewsScreenComponent } from './reviews-screen.component';
import { of } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('ReviewsScreenComponent', () => {
	let component: ReviewsScreenComponent;
	let fixture: ComponentFixture<ReviewsScreenComponent>;
	let firestore: AngularFirestore;

	const mockActivatedRoute = {
		params: of({ id: 240 })
	};

	const mockFirestore = {
		collection: () => ({
			valueChanges: () =>
				of([
					{
						date: '08/09/2023',
						movieId: 240,
						reviewTitle: 'Masterpiece',
						rating: 5,
						feedback: 'No words needed'
					}
				])
		})
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			declarations: [ReviewsScreenComponent],
			providers: [
				ReviewsScreenComponent,
				{ provide: AngularFirestore, useValue: mockFirestore },
				{ provide: ActivatedRoute, useValue: mockActivatedRoute }
			]
		});
		//fixture = TestBed.createComponent(ReviewsScreenComponent);
		//component = fixture.componentInstance;
		//fixture.detectChanges();
		component = TestBed.inject(ReviewsScreenComponent);
		firestore = TestBed.inject(AngularFirestore);
	});

	it('should fetch reviews data', () => {
		const movieId = 240;
		const spyValueChanges = spyOn(
			firestore.collection('reviews') as any,
			'valueChanges'
		).and.callThrough();

		component.getReviewsByMovieId(movieId);

		expect(component.reviews).toEqual([
			{
				date: '08/09/2023',
				movieId: 240,
				reviewTitle: 'Masterpiece',
				rating: 5,
				feedback: 'No words needed',
				username: 'Gandhy Garcia'
			}
		]);
	});
});
