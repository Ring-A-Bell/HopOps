import { Component } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  constructor(private InventoryService: InventoryService, private router: Router) { }
  private ownerID: string = 'YPs-zlGU6gwxOAH3O-zWb';

  public columnsToDisplay: string[] = ['name', 'unitSize', 'quantity', 'description'];
  public myDataSource: any;

  ngOnInit(): void {
    this.InventoryService.getUserInventories(this.ownerID).subscribe((data: any) => {
      console.log("data ", data);
      this.myDataSource = new MatTableDataSource<any>(data);
      console.log("Inventory page loaded");
    });
  }

  createNewInventory() {
    this.InventoryService.createNewInventory(this.ownerID).subscribe((data) => {
      var insertedID = data[0]._id;
    });
    this.router.navigateByUrl('/inventory', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
}
