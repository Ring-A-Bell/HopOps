import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SalesService {
  hostname:string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  //
  // Returns json list object of sales
  //
  getSaleHistory(user: string) {
    return this.http.get(this.hostname + '/app/saleHistory/' + user);
  }
}
