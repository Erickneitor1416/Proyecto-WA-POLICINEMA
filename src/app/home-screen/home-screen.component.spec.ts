import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { of } from 'rxjs';
import { Movie, MovieData } from '../Interfaces/Interfaces';
import { MoviesCardListComponent } from '../movies-card-list/movies-card-list.component';
import { AuthService } from '../services/auth.service';
import { MovieService } from '../services/movie.service';
import { HomeScreenComponent } from './home-screen.component';
const movies: Movie[] = [
	{
		adult: false,
		backdrop_path: '/backdrop1.jpg',
		genres: [{ id: 1, name: 'Action' }],
		id: 1,
		original_language: 'en',
		original_title: 'Movie 1',
		overview: 'Overview 1',
		popularity: 100,
		poster_path: '/poster1.jpg',
		release_date: '2023-01-01',
		title: 'Movie 1',
		video: false,
		vote_average: 8.0,
		vote_count: 1000
	},
	{
		adult: false,
		backdrop_path: '/backdrop2.jpg',
		genres: [{ id: 2, name: 'Comedy' }],
		id: 2,
		original_language: 'en',
		original_title: 'Movie 2',
		overview: 'Overview 2',
		popularity: 200,
		poster_path: '/poster2.jpg',
		release_date: '2023-02-02',
		title: 'Movie 2',
		video: false,
		vote_average: 9.0,
		vote_count: 2000
	}
];
describe('HomeScreenComponent', () => {
	let component: HomeScreenComponent;
	let fixture: ComponentFixture<HomeScreenComponent>;
	let movieService: MovieService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [HomeScreenComponent, MoviesCardListComponent, SlickCarouselComponent],
			imports: [AngularFireAuthModule],
			providers: [
				{ provide: MovieService, useClass: MovieServiceMock },
				{ provide: AuthService, useClass: AuthServiceMock },
				{ provide: AngularFireAuth, useClass: AngularFireAuthMock }
			]
		});

		fixture = TestBed.createComponent(HomeScreenComponent);
		component = fixture.componentInstance;
		movieService = TestBed.inject(MovieService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should fetch now playing movies on init', () => {
		spyOn(movieService, 'getNowPlayingMovies').and.returnValue(
			of({ results: movies } as MovieData)
		);

		component.ngOnInit();

		expect(movieService.getNowPlayingMovies).toHaveBeenCalled();
		expect(component.nowPlayingMovies).toEqual(movies);
		spyOn(component.nowPlayingMoviesSubscriber, 'unsubscribe');
		component.ngOnDestroy();
		expect(component.nowPlayingMoviesSubscriber.unsubscribe).toHaveBeenCalled();
	});

	it('should fetch popular movies on init', () => {
		spyOn(movieService, 'getPopularMovies').and.returnValue(of({ results: movies } as MovieData));
		component.ngOnInit();
		expect(movieService.getPopularMovies).toHaveBeenCalled();
		expect(component.popularMovies).toEqual(movies);
		spyOn(component.popularMoviesSubscriber, 'unsubscribe');
		component.ngOnDestroy();
		expect(component.popularMoviesSubscriber.unsubscribe).toHaveBeenCalled();
	});

	it('should fetch top-rated movies on init', () => {
		spyOn(movieService, 'getTopRatedMovies').and.returnValue(of({ results: movies } as MovieData));
		component.ngOnInit();
		expect(movieService.getTopRatedMovies).toHaveBeenCalled();
		expect(component.topRatedMovies).toEqual(movies);
		spyOn(component.topRatedMoviesSubscriber, 'unsubscribe');
		component.ngOnDestroy();
		expect(component.topRatedMoviesSubscriber.unsubscribe).toHaveBeenCalled();
	});

	it('should fetch upcoming movies on init', () => {
		spyOn(movieService, 'getUpcomingMovies').and.returnValue(of({ results: movies } as MovieData));
		component.ngOnInit();
		expect(movieService.getUpcomingMovies).toHaveBeenCalled();
		expect(component.upcomingMovies).toEqual(movies);
		spyOn(component.upcomingMoviesSubscriber, 'unsubscribe');
		component.ngOnDestroy();
		expect(component.upcomingMoviesSubscriber.unsubscribe).toHaveBeenCalled();
	});
});

class MovieServiceMock {
	getNowPlayingMovies() {
		return of({ results: movies } as MovieData);
	}

	getPopularMovies() {
		return of({ results: movies } as MovieData);
	}

	getUpcomingMovies() {
		return of({ results: movies } as MovieData);
	}

	getTopRatedMovies() {
		return of({ results: movies } as MovieData);
	}
}
class AuthServiceMock {}
class AngularFireAuthMock {}
