import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  userID: String = "YPs-zlGU6gwxOAH3O-zWb";
  constructor(private http: HttpClient) { }

  public getUserRecipes(): Observable<any> {
    var jsonRecipes: any;
    var jsonObj: any;
    return this.http.get("http://localhost:8080/app/userrecipes/" + this.userID);
  }

  public getAllRecipes(): Observable<any> {
    var jsonRecipes: any;
    var jsonObj: any;
    return this.http.get("http://localhost:8080/app/recipes");
  }

  public createJSONRecipe(): any {
    var obj: any = {
      "title": "Spaghetti Carbonara",
      "description": "A classic spaghetti carbonara recipe",
      "image": "https://images.unsplash.com/photo-1554118811-1e0d5826cf09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "body": "This spaghetti carbonara recipe is creamy, cheesy, and absolutely delicious!",
      "recipeIngredients": [
          {
              "ingredient": "1J1sO3l9Aba4JxKmC4lVv",
              "quantity": 3
          },
          {
              "ingredient": "jKtX5X3Trp7DhKlFW9Y3T",
              "quantity": 2
          },
          {
              "ingredient": "m1G2asH2jcQ3zFzRrCxPT",
              "quantity": 1
          }
      ],
      "favorite": false
    }
    return obj;
  }

  public createNewRecipe(): Observable<any> {
    var jsonObj: any;
    jsonObj = this.createJSONRecipe();
    console.log(jsonObj);
    return this.http.post("http://localhost:8080/app/recipes", jsonObj);
  }

  public addRecipeToUserList(newID: any): Observable<any> {
    var jsonObj: any = {
      "recipeID": newID
    }
    console.log(jsonObj);
    return this.http.post("http://localhost:8080/app/userrecipes/" + this.userID, jsonObj);
  }
}
