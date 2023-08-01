import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../Interfaces/Interfaces';

@Component({
	selector: 'app-movie-detail-screen',
	templateUrl: './movie-detail-screen.component.html',
	styleUrls: ['./movie-detail-screen.component.scss']
})
export class MovieDetailScreenComponent implements OnInit {
	movie: Movie;
	credits: any;
	constructor(
		private activeRoute: ActivatedRoute,
		private movieService: MovieService
	) {}

	ngOnInit() {
		this.activeRoute.params.subscribe((params) => {
			const id = params['id'];
			if (id) {
				this.movieService.getMovieById(id).subscribe((movie) => {
					this.movie = movie;
					console.log(this.movie, id);
				});
				this.movieService.getCreditsByMovieId(id).subscribe((credits) => {
					this.credits = credits.cast;
				});
			}
		});
	}
}
