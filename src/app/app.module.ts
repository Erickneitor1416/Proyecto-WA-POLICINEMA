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

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, MovieCardComponent, MoviesCardListComponent],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    ClarityModule,
    BrowserModule,
    SlickCarouselModule,
    FormsModule,
    NzCardModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
