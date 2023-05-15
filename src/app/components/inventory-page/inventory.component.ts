import { Component } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  constructor(private InventoryService: InventoryService, private router: Router) { }

  jsonInventories: any;

  ngOnInit(): void {
    this.InventoryService.getInventory().subscribe((data: any) => this.jsonInventories = data[0].inventories);
    //this.InventoryService.getAllRecipes().subscribe((data: any) =>  this.jsonInventories = data);
  }

  createNewInventory() {
    this.InventoryService.createNewInventory().subscribe((data) => {
      var insertedID = data[0]._id;
    });
    this.router.navigateByUrl('/inventory', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
}
