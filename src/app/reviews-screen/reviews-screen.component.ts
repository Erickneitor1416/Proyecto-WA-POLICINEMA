import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie, ReviewData } from '../Interfaces/Interfaces';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';



@Component({
	selector: 'app-reviews-screen',
	templateUrl: './reviews-screen.component.html',
	styleUrls: ['./reviews-screen.component.scss']
})
export class ReviewsScreenComponent implements OnInit {
	movie: Movie;
	movieId: number;
	reviews: ReviewData[] ;
	suscription: Subscription;
	initialStarsArray: number[] = [];
	initialStarNumber:number;
	username:string

	constructor(
		private activeRoute: ActivatedRoute,
		private movieService: MovieService,
		private firestore: AngularFirestore,
		private authService: AuthService
	) { }

	ngOnInit() {
		this.activeRoute.params.subscribe((params) => {
			const id = params['id'];
			if (id) {
				this.movieService.getMovieById(id).subscribe((movie) => {
					this.movie = movie;
					this.movieId = movie.id;
					console.log(this.movieId);
					this.getReviewsByMovieId(this.movieId)
					this.authService.userSubject$.subscribe((user) => {
						if (user) {
						  this.username = user.displayName;
						  console.log(this.username)
						}
					  });
				});
			}
		});
	}

	getReviewsByMovieId(movieId:number){
		this.suscription = this.firestore
		.collection<ReviewData>('reviews', (ref) => ref.where('movieId', '==', movieId).orderBy('date', 'desc'))
		.valueChanges()
		.subscribe((reviews:ReviewData[]) => {
			this.reviews = reviews;
			console.log(this.reviews)
			this.initialStarsArray = reviews.map((review) => review.rating);
			this.initialStarNumber = this.calculateAverage();
			console.log(this.initialStarNumber);
		});
	}

	calculateAverage(): number {
		const sum = this.initialStarsArray.reduce((total, stars) => total + stars, 0);
		const average = sum / this.initialStarsArray.length;
		return parseFloat(average.toFixed(1));
	}

	modalOpen = false;

	//Modal para agregar comentario
	openModal(): void {
		this.modalOpen = true;
	}

	closeModal(): void {
		this.modalOpen = false;
	}

	ngOnDestroy() {
		// Unsubscribe when the component is destroyed
		this.suscription.unsubscribe();
	}
}
