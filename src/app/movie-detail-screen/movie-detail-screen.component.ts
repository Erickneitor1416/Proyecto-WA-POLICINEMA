import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../Interfaces/Interfaces';
import { MovieService } from '../services/movie.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-movie-detail-screen',
	templateUrl: './movie-detail-screen.component.html',
	styleUrls: ['./movie-detail-screen.component.scss']
})
export class MovieDetailScreenComponent implements OnInit, OnDestroy {
	movie: Movie;
	credits: any;
	creditsSubscription: Subscription;
	movieSubscription: Subscription;

	constructor(
		private activeRoute: ActivatedRoute,
		private movieService: MovieService
	) {}
	ngOnDestroy(): void {
		this.movieSubscription.unsubscribe();
		this.creditsSubscription.unsubscribe();
	}

	ngOnInit() {
		this.activeRoute.params.subscribe((params) => {
			const id = params['id'];
			if (id) {
				this.movieSubscription = this.movieService.getMovieById(id).subscribe((movie) => {
					this.movie = movie;
				});
				this.creditsSubscription = this.movieService
					.getCreditsByMovieId(id)
					.subscribe((credits) => {
						this.credits = credits.cast;
					});
			}
		});
	}
}
