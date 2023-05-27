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

  public createJSONInventory(ownerID: string): any {
    var obj: any = {
      "ownerID": ownerID,
      "ingredients": [ "TI7OBzZrGmEv6zVQI1vM8", "Cp4opcfHR6Yu6MgYcaK_3"]
    }
    return obj;
  }

  public createNewInventory(ownerID: string): Observable<any> {
    var jsonObj: any;
    jsonObj = this.createJSONInventory(ownerID);
    console.log(jsonObj);
    return this.http.post("/app/inventories", jsonObj);
  }
}
