import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  public getRecipes(): Observable<any> {
    var jsonRecipes: any;
    var jsonObj: any;
    return this.http.get("http://localhost:8080/app/userrecipes/YPs-zlGU6gwxOAH3O-zWb");
  }
}
