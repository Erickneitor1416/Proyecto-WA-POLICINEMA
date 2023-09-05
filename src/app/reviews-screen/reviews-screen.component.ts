import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from '../Interfaces/Interfaces';
import { MovieService } from '../services/movie.service';

@Component({
	selector: 'app-reviews-screen',
	templateUrl: './reviews-screen.component.html',
	styleUrls: ['./reviews-screen.component.scss']
})
export class ReviewsScreenComponent implements OnInit {
	movie: Movie;
	movieId: number;
	reviews: any[];
	subscription: Subscription;

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
					this.subscription = this.firestore
						.collection('reviews', (ref) => ref.where('movieId', '==', this.movieId))
						.valueChanges()
						.subscribe((reviews) => {
							this.reviews = reviews;
						});
				});
			}
		});
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
