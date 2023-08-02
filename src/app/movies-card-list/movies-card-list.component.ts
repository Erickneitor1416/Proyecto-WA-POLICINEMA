import { Component, Input } from '@angular/core';
import { Movie } from '../Interfaces/Interfaces';

@Component({
	selector: 'app-movies-card-list',
	templateUrl: './movies-card-list.component.html',
	styleUrls: ['./movies-card-list.component.scss']
})
export class MoviesCardListComponent {
	@Input()
	movies: Movie[];
	slideConfig = {
		slidesToShow: 6,
		slidesToScroll: 4,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 5000,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
					infinite: true
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 0.5,
					slidesToScroll: 0.5
				}
			}
		]
	};
	constructor() {}
}
