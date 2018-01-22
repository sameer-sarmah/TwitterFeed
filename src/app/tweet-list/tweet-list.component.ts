import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { HttpService } from '../services/http.service';
import { Observable } from 'rxjs/Observable';
import { DatePipe,AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {
public tweetList:any[]=[];
public tweetCount:number=Number.MAX_VALUE;
private growingThreshold:number=5;
constructor(private svc:TweetService,private http:HttpService) { 

  }

  ngOnInit() { 
  //this.tweetList=this.svc.getTweetList(this.growingThreshold,this.tweetList.length-1);
  //this.tweetCount=this.svc.getTweetCount();
   this.getTweetCountHTTP();
   this.getTweetListHTTP();
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
      obs=this.http.getTweetList(this.tweetList.length,this.tweetList.length+this.growingThreshold-1);
      }
      else{
        obs=this.http.getTweetList(this.tweetList.length,this.tweetCount); 
      }
      obs.subscribe(
      (data) => {
         let tweets=data;
         console.log(tweets);
         this.tweetList=this.tweetList.concat(tweets);
      },
      (error) => console.log(error)
    );
  }

}
