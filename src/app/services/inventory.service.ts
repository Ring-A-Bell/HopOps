import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  inventoryID: String = "000000000000000000051";
  ownerID: String = "000000000000000000021";
  constructor(private http: HttpClient) { }

  public getInventory(): Observable<any> {
    var jsonInventories: any;
    var jsonObj: any;
    return this.http.get("http://localhost:8080/app/inventories/" + this.inventoryID);
  }

  public getUserInventories(): Observable<any> {
    var jsonInventories: any;
    var jsonObj: any;
    return this.http.get("http://localhost:8080/app/inventories/user/" + this.ownerID);
  }

  public createJSONInventory(): any {
    var obj: any = {
      "ownerID": this.ownerID,
      "ingredients": [ "TI7OBzZrGmEv6zVQI1vM8", "Cp4opcfHR6Yu6MgYcaK_3"]
    }
    return obj;
  }

  public createNewInventory(): Observable<any> {
    var jsonObj: any;
    jsonObj = this.createJSONInventory();
    console.log(jsonObj);
    return this.http.post("http://localhost:8080/app/inventories", jsonObj);
  }
}
