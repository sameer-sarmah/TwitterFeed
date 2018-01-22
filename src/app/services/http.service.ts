import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class HttpService {
  private svcURL="api/tweets";
  private twitterCount:number;
  constructor(private http: Http) { }

  makeODataCall(url:string){
    const headers = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
    return this.http.get(url)
    .map(
      (response: Response) => {
        return response.json();
      }
    )
    .catch(
      (error: Response) => {
        return Observable.throw('Something went wrong');
      }
    );
  }

  getTweetList(from:number,to:number):Observable<any>{
    let paginationQuery="/sublist?from="+from+"&to="+to+"";
    return this.makeODataCall(this.svcURL+paginationQuery)

  }


  getTweetCount():Observable<any>{
    return this.makeODataCall(this.svcURL+"/count");
  }

}
