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
  private inventoryID: string = "000000000000000000051";
  private ownerID: string = "000000000000000000021";

  public columnsToDisplay: string[] = ['Name', 'UnitSize', 'Quantity', 'Description'];
  public dataSource = new MatTableDataSource();
  public jsonInventories: any;

  ngOnInit(): void {
    this.InventoryService.getInventory(this.inventoryID).subscribe((data: any) => {
      console.log(data);
      this.jsonInventories = data[0].inventories;
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
