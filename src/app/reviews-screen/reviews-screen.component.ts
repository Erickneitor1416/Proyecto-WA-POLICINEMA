import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../Interfaces/Interfaces';


@Component({
  selector: 'app-reviews-screen',
  templateUrl: './reviews-screen.component.html',
  styleUrls: ['./reviews-screen.component.scss'],
})
export class ReviewsScreenComponent implements OnInit {

  movie: Movie;

  constructor(
    private activeRoute: ActivatedRoute,
		private movieService: MovieService,
  ){

  }

  ngOnInit(){
    this.activeRoute.params.subscribe((params) => {
			const id = params['id'];
			if (id) {
				this.movieService.getMovieById(id).subscribe((movie) => {
					this.movie = movie;
					console.log(this.movie, id);
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

  /*
  @Output() ratingChanged = new EventEmitter<number>();

  getStarShape(index: number): string {
    return index < this.selectedRating ? 'star-solid' : 'star';
  }

  setRating(rating: number): void {
    this.selectedRating = rating;
    this.ratingChanged.emit(rating);
  }*/

}
