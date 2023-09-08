import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../Interfaces/Interfaces';
import { ReviewsScreenComponent } from '../reviews-screen/reviews-screen.component';
import { format } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-add-review-body',
  templateUrl: './add-review-body.component.html',
  styleUrls: ['./add-review-body.component.scss']
})
export class AddReviewBodyComponent implements OnInit {
  form: FormGroup;
  modalOpen = false;
  movie: Movie;
  movieId: number = 0;
  rating: number = 0;
  showProgressBar = false;
  progress = 0;
  username: string;


  constructor(
    private reviewsScreen: ReviewsScreenComponent,
    private firestore: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private movieService: MovieService,
    private formbuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formbuilder.group({
      reviewTitle: ['', Validators.required],
      feedback: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.movieService.getMovieById(id).subscribe((movie) => {
          this.movie = movie;
          this.movieId = movie.id;
          console.log(this.movie, id);
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

  onRatingSet(stars: number) {
    this.rating = stars;
  }

  saveRating() {
    if (this.form.valid) {
  
      const currentDate = format(new Date(), 'dd/MM/yyyy');

      const dataToSave = {
        ...this.form.value,
        movieId: this.movieId,
        date: currentDate,
        rating: this.rating,
        username: this.username
      };

      this.firestore.collection('reviews').add(dataToSave)
        .then(() => {
          console.log('Data saved to Firestore successfully.');
          console.log(dataToSave)
          // Reset values
          this.rating = 0;
          this.reviewsScreen.closeModal();
          this.form.reset()
        })
        .catch(error => {
          console.error('Error saving data to Firestore:', error);
        });
    }else{
      console.error('One of the fields is empty');
    }

  }

}
