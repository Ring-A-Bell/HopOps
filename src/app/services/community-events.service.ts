import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityEventsService {
  gatheringID: String = "000000000000000000031";
  constructor(private http: HttpClient) { }

  public getAllCommunityEvents(): Observable<any> {
    var jsonevent: any;
    var jsonObj: any;
    return this.http.get("http://localhost:8080/app/gatherings");
  }

}