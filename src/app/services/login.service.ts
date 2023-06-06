import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLoggedIn: boolean = false;
  constructor(private http: HttpClient) { }

  performLogin(userID: string):  Observable<any> {
    return this.http.get("/app/users/" + userID);
  }

  setLoginStatus(status: boolean): void {
    this.isLoggedIn = status;
  }
}
