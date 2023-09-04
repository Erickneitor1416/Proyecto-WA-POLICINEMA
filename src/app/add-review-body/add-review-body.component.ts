import { Component,OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../Interfaces/Interfaces';
import { ReviewsScreenComponent } from '../reviews-screen/reviews-screen.component';

@Component({
  selector: 'app-add-review-body',
  templateUrl: './add-review-body.component.html',
  styleUrls: ['./add-review-body.component.scss']
})
export class AddReviewBodyComponent implements OnInit{

  modalOpen = false;
  movie: Movie;
  movieId: number = 0;
  reviewTitle ='';
  feedback: string = ''
  rating: number = 0;

  constructor(
    private reviewsScreen : ReviewsScreenComponent,
    private firestore: AngularFirestore,
    private activeRoute: ActivatedRoute,
		private movieService: MovieService,
  ){}

  ngOnInit(){
    this.activeRoute.params.subscribe((params) => {
			const id = params['id'];
			if (id) {
				this.movieService.getMovieById(id).subscribe((movie) => {
					this.movie = movie;
          this.movieId = movie.id;
					console.log(this.movie, id);
				});
			}
		});

  }

  onRatingSet(stars: number){
    this.rating = stars;
  }
  
  saveRating() {
    // Create an object with the data to be saved
    const dataToSave = {
      movieId: this.movieId,
      reviewTitle:this.reviewTitle,
      rating: this.rating,
      feedback: this.feedback
    };

    // Use AngularFirestore to add the data to Firestore
    this.firestore.collection('reviews').add(dataToSave)
      .then(() => {
        console.log('Data saved to Firestore successfully.');
        console.log(dataToSave)
        // Optionally, reset the form
        this.reviewTitle = '',
        this.rating = 0;
        this.feedback = '';
        this.reviewsScreen.closeModal();
      })
      .catch(error => {
        console.error('Error saving data to Firestore:', error);
    });
  }

  saveForm() {
    // Perform logic to save the form data
    console.log('Rating:', this.rating);
    console.log('Feedback:', this.feedback);
    // Close the modal
    this.modalOpen = false;
  };
}
