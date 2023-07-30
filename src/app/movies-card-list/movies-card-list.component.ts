import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { NowMovies } from '../Interfaces/Interfaces';

@Component({
  selector: 'app-movies-card-list',
  templateUrl: './movies-card-list.component.html',
  styleUrls: ['./movies-card-list.component.scss'],
})
export class MoviesCardListComponent implements OnInit {
  movies: NowMovies[];
  nowMoviePlayingMovies: Subscription;

  constructor(private movieService: MovieService) {}
  slideConfig = {
    slidesToShow: 9,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  ngOnInit(): void {
    this.nowMoviePlayingMovies = this.movieService
      .getNowPlayingMovies()
      .subscribe({
        next: (data) => {
          this.movies = data.results;
          console.log(data);
        },
      });
  }
}
