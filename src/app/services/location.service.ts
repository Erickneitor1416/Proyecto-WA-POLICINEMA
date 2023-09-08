import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LocationService {
	private geocodeUrl = 'https://api.opencagedata.com/geocode/v1/json';
	private apiKey = environment.opencageKey;

	constructor(private http: HttpClient) {}

	getUserCountry(): Observable<string> {
		return new Observable<string>((observer) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords;
						const apiQuery = `${this.geocodeUrl}?q=${latitude}+${longitude}&key=${this.apiKey}`;

						this.http
							.get(apiQuery)
							.pipe(
								catchError((error) => {
									observer.error(error);
									return throwError(error);
								})
							)
							.subscribe((response: any) => {
								if (response.results.length > 0) {
									const countryComponents = response.results[0].components;
									const country = countryComponents.country || '';
									observer.next(country);
									observer.complete();
								} else {
									observer.error(new Error('Ubicación no encontrada'));
								}
							});
					},
					(error) => {
						observer.error(error);
					}
				);
			} else {
				observer.error(new Error('La geolocalización no está soportada en este navegador'));
			}
		});
	}
}
