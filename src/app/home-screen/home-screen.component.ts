import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { Movie } from '../Interfaces/Interfaces';

@Component({
	selector: 'app-home-screen',
	templateUrl: './home-screen.component.html',
	styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit, OnDestroy {
	nowPlayingMovies: Movie[];
	nowPlayingMoviesSubscriber: Subscription;
	popularMovies: Movie[];
	popularMoviesSubscriber: Subscription;
	upcomingMovies: Movie[];
	upcomingMoviesSubscriber: Subscription;
	topRatedMovies: Movie[];
	topRatedMoviesSubscriber: Subscription;

	constructor(private movieService: MovieService) {}
	ngOnInit(): void {
		this.nowPlayingMoviesSubscriber = this.movieService
			.getNowPlayingMovies()
			.subscribe({ next: (data) => (this.nowPlayingMovies = data.results) });
		this.popularMoviesSubscriber = this.movieService
			.getPopularMovies()
			.subscribe({ next: (data) => (this.popularMovies = data.results) });
		this.upcomingMoviesSubscriber = this.movieService
			.getUpcomingMovies()
			.subscribe({ next: (data) => (this.upcomingMovies = data.results) });
		this.topRatedMoviesSubscriber = this.movieService
			.getTopRatedMovies()
			.subscribe({ next: (data) => (this.topRatedMovies = data.results) });
	}
	ngOnDestroy(): void {
		this.nowPlayingMoviesSubscriber && this.nowPlayingMoviesSubscriber.unsubscribe();

		this.popularMoviesSubscriber && this.popularMoviesSubscriber.unsubscribe();

		this.upcomingMoviesSubscriber && this.upcomingMoviesSubscriber.unsubscribe();

		this.topRatedMoviesSubscriber && this.topRatedMoviesSubscriber.unsubscribe();
	}
}
