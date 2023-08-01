import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieData } from '../Interfaces/Interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MovieService {
	constructor(private http: HttpClient) {}

	getNowPlayingMovies(): Observable<MovieData> {
		const apiNowPlaying = `${environment.api}now_playing${environment.api_key}${environment.language}`;
		return this.http.get(apiNowPlaying) as Observable<MovieData>;
	}
	getPopularMovies(): Observable<MovieData> {
		const apiPopularMovies = `${environment.api}popular${environment.api_key}${environment.language}`;
		return this.http.get(apiPopularMovies) as Observable<MovieData>;
	}

	getUpcomingMovies(): Observable<MovieData> {
		const apiUpcomingMovies = `${environment.api}upcoming${environment.api_key}${environment.language}`;
		return this.http.get(apiUpcomingMovies) as Observable<MovieData>;
	}
	getTopRatedMovies(): Observable<MovieData> {
		const apiTopRatedMovies = `${environment.api}top_rated${environment.api_key}${environment.language}`;
		return this.http.get(apiTopRatedMovies) as Observable<MovieData>;
	}
	getMovieById(id: string): Observable<Movie> {
		const apiMovieById = `${environment.api}${id}${environment.api_key}${environment.language}`;
		return this.http.get(apiMovieById) as Observable<Movie>;
	}
	getCreditsByMovieId(id: string): Observable<any> {
		const apiCreditsByMovieId = `${environment.api}${id}/credits${environment.api_key}${environment.language}`;
		return this.http.get(apiCreditsByMovieId) as Observable<any>;
	}
}
