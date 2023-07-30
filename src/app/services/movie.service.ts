import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=200fc23e45a899126bd8d17012f319b6';
  

  constructor(private http: HttpClient) {}

  getNowPlayingMovies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
