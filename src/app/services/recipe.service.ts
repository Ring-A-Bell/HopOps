import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  public getUserRecipes(): Observable<any> {
    var jsonRecipes: any;
    const userID: String = "YPs-zlGU6gwxOAH3O-zWb";
    var jsonObj: any;
    return this.http.get("http://localhost:8080/app/userrecipes/" + userID);
  }

  public getAllRecipes(): Observable<any> {
    var jsonRecipes: any;
    var jsonObj: any;
    return this.http.get("http://localhost:8080/app/recipes");
  }
}
