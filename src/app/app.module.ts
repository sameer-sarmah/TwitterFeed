import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { TweetService } from './services/tweet.service';


@NgModule({
  declarations: [
    AppComponent,
    TweetListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [TweetService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
