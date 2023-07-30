import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Subscription } from 'rxjs';
import { NowMovies } from '../Interfaces/Interfaces';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input() nowMovie: NowMovies;
}
