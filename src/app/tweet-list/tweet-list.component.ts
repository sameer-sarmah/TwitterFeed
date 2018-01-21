import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { HttpService } from '../services/http.service';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {
private tweetList:any[]=[];
private tweetCount:number=Number.MAX_VALUE;
private growingThreshold:number=5;
constructor(private svc:TweetService,private http:HttpService) { 

  }

  ngOnInit() { 
  this.tweetList=this.svc.getTweetList(this.growingThreshold,this.tweetList.length-1);
  // this.getTweetCountHTTP();
  // this.getTweetListHTTP();
  }

  fetchMoreTweets(){
    let tweets=[];
    if((this.tweetList.length+this.growingThreshold)<=this.tweetCount){
     tweets=this.svc.getTweetList(this.growingThreshold,this.tweetList.length-1);
    }
    else{
     tweets=this.svc.getTweetList(this.tweetCount-this.tweetList.length,this.tweetList.length-1); 
    }
    this.tweetList=this.tweetList.concat(tweets);
  }

  getTweetCountHTTP(){
  this.http.getTweetCount().subscribe(
    (count) => {
      this.tweetCount = +count;
      console.log(count)
    },
    (error) => console.log(error)
  );
  }

  getTweetListHTTP(){
     let obs:Observable<any>;
    if((this.tweetList.length+this.growingThreshold)<=this.tweetCount){
      obs=this.http.getTweetList(this.growingThreshold,this.tweetList.length);
      }
      else{
        obs=this.http.getTweetList(this.tweetCount-this.tweetList.length,this.tweetList.length); 
      }
      obs.subscribe(
      (data) => {
         let products=data.value;
         console.log(products);
         this.tweetList=this.tweetList.concat(products);
      },
      (error) => console.log(error)
    );
  }

}
