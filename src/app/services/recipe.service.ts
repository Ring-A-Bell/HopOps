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
      "title": "Beer Carbonara",
      "description": "A classic Beer recipe",
      "image": "https://i.ibb.co/64sDwJH/image-processing20200410-24803-7dh2je.png",
      "body": "This beer carbonara recipe is creamy, cheesy, and absolutely delicious!",
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

  public createNewRecipe(jsonParam: any): Observable<any> {
    console.log("Adding this to DB -> \n", jsonParam);
    return this.http.post("http://localhost:8080/app/recipes", jsonParam);
  }

  public addRecipeToUserList(newID: any): Observable<any> {
    var jsonObj: any = {
      "recipeID": newID
    }
    console.log(jsonObj);
    return this.http.post("http://localhost:8080/app/userrecipes/" + this.userID, jsonObj);
  }
}
