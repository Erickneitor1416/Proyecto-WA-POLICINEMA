import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReviewsScreenComponent } from './reviews-screen.component';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';

fdescribe('ReviewsScreenComponent', () => {
  let component: ReviewsScreenComponent;
  let fixture: ComponentFixture<ReviewsScreenComponent>;
  class AuthServiceMock { }
  class AngularFireAuthMock { }

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
            username: 'nicolas barragan',
          },
        ]);
      },
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ReviewsScreenComponent],
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
        username: 'nicolas barragan',
      },
    ]);
  }));
});
