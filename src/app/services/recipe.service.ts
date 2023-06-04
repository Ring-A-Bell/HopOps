import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  userID: String = "YPs-zlGU6gwxOAH3O-zWb";
  detailedRecipe: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  public getUserRecipes(): Observable<any> {
    var jsonRecipes: any;
    var jsonObj: any;
    return this.http.get("/app/recipeLists/" + this.userID);
  }

  public getAllRecipes(): Observable<any> {
    var jsonRecipes: any;
    var jsonObj: any;
    return this.http.get("/app/recipes");
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
    return this.http.post("/app/recipes", jsonParam);
  }

  public addRecipeToUserList(newID: any): Observable<any> {
    var jsonObj: any = {
      "recipeID": newID
    }
    console.log(jsonObj);
    return this.http.post("/app/recipeLists/" + this.userID, jsonObj);
  }

  public setSelectedRecipe(recipe: any) {
    this.detailedRecipe.next(recipe);
    console.log("setting this recipe -> ", this.detailedRecipe);
  }

  public getSelectedRecipe(): Observable<any> {
    console.log("returning this recipe -> ", this.detailedRecipe);
    return this.detailedRecipe.asObservable();
  }
}
