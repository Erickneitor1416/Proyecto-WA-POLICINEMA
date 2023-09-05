import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../Interfaces/Interfaces';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
	selector: 'app-reviews-screen',
	templateUrl: './reviews-screen.component.html',
	styleUrls: ['./reviews-screen.component.scss']
})
export class ReviewsScreenComponent implements OnInit {
	movie: Movie;
	movieId: number;
	reviews: Observable<any[]>;

	constructor(
		private activeRoute: ActivatedRoute,
		private movieService: MovieService,
		private firestore: AngularFirestore
	) {}

	ngOnInit() {
		this.activeRoute.params.subscribe((params) => {
			const id = params['id'];
			if (id) {
				this.movieService.getMovieById(id).subscribe((movie) => {
					this.movie = movie;
					this.movieId = movie.id;
					console.log(this.movieId);
				});
			}
		});

		this.reviews = this.firestore
			.collection('movies', (ref) => ref.where('movieId', '==', this.movieId))
			.valueChanges();
	}

	modalOpen = false;

	/*
stars = [1, 2, 3, 4, 5];
selectedRating = 5;
*/

	//Modal para agregar comentario
	openModal(): void {
		this.modalOpen = true;
	}

	closeModal(): void {
		this.modalOpen = false;
	}
}
