import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MoviesCardListComponent } from './movies-card-list/movies-card-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ClarityIcons, userIcon, homeIcon, bookIcon } from '@cds/core/icon';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { RouterModule } from '@angular/router';
import { MovieDetailScreenComponent } from './movie-detail-screen/movie-detail-screen.component';
ClarityIcons.addIcons(homeIcon);
ClarityIcons.addIcons(bookIcon);
ClarityIcons.addIcons(userIcon);
registerLocaleData(en);
@NgModule({
	declarations: [
		AppComponent,
		MovieCardComponent,
		MoviesCardListComponent,
		NavbarComponent,
		HomeScreenComponent,
		MovieDetailScreenComponent
	],
	imports: [
		HttpClientModule,
		BrowserAnimationsModule,
		ClarityModule,
		BrowserModule,
		SlickCarouselModule,
		FormsModule,
		NzCardModule,
		RouterModule.forRoot([
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{ path: 'home', component: HomeScreenComponent },
			{ path: 'movie-detail/:id', component: MovieDetailScreenComponent }
		])
	],
	providers: [{ provide: NZ_I18N, useValue: en_US }],
	bootstrap: [AppComponent]
})
export class AppModule {}
