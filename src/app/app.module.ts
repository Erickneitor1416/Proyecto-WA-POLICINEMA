import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
	ClarityIcons,
	bookIcon,
	homeIcon,
	plusCircleIcon,
	starIcon,
	userIcon
} from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxStarsModule } from 'ngx-stars';
import { environment } from 'src/environments/environment';
import { AddReviewBodyComponent } from './add-review-body/add-review-body.component';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieDetailScreenComponent } from './movie-detail-screen/movie-detail-screen.component';
import { MoviesCardListComponent } from './movies-card-list/movies-card-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReviewsScreenComponent } from './reviews-screen/reviews-screen.component';
import { ProfileScreenComponent } from './profile-screen/profile-screen.component';

ClarityIcons.addIcons(homeIcon);
ClarityIcons.addIcons(bookIcon);
ClarityIcons.addIcons(userIcon);
ClarityIcons.addIcons(starIcon);
ClarityIcons.addIcons(plusCircleIcon);
registerLocaleData(en);
@NgModule({
	declarations: [
		AppComponent,
		MovieCardComponent,
		MoviesCardListComponent,
		NavbarComponent,
		HomeScreenComponent,
		MovieDetailScreenComponent,
		ReviewsScreenComponent,
		AddReviewBodyComponent,
		LoginScreenComponent,
		ProfileScreenComponent
	],
	imports: [
		HttpClientModule,
		BrowserAnimationsModule,
		ClarityModule,
		BrowserModule,
		SlickCarouselModule,
		ReactiveFormsModule,
		FormsModule,
		NzCardModule,
		NgxStarsModule,
		
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		AngularFirestoreModule,
		RouterModule.forRoot([
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{ path: 'home', component: HomeScreenComponent },
			{ path: 'movie-detail/:id', component: MovieDetailScreenComponent },
			{ path: 'reviews/:id', component: ReviewsScreenComponent },
			{ path: 'login', component: LoginScreenComponent },
			{ path: 'profile', component: ProfileScreenComponent }
		])
	],
	providers: [{ provide: NZ_I18N, useValue: en_US }],
	bootstrap: [AppComponent]
})
export class AppModule {}
