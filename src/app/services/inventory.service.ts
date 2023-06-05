import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  public getInventory(inventoryID: string): Observable<any> {
    var jsonInventories: any;
    var jsonObj: any;
    return this.http.get("/app/inventories/" + inventoryID);
  }

  public getUserInventories(ownerID: string): Observable<any> {
    var jsonInventories: any;
    var jsonObj: any;
    return this.http.get("/app/inventories/user/" + ownerID);
  }

  public createNewIngredient(jsonParam: any): Observable<any> {
    console.log("Adding this to DB -> \n", jsonParam);
    return this.http.post("/app/ingredients", jsonParam);
  }

  public addIngredientToInventory(newID: any): Observable<any> {
    var jsonObj: any = {
      "ingredientID": newID
    }
    console.log(jsonObj);
    return this.http.post("/app/inventories2", jsonObj);
  }
}
