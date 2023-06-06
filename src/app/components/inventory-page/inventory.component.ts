import { Component } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { nanoid } from 'nanoid';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  constructor(private InventoryService: InventoryService, private router: Router, private formBuilder: FormBuilder) { }

  ingredientUUID: string = nanoid();

  inputFormDetails = this.formBuilder.group({
    ingredientID: this.ingredientUUID,
    quantity: 0,
    name: "",
    description: "",
    unitSize: ""
  });

  
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

  renderForm() {
    var inputForm = document.getElementById("input-form");
    var recipes = document.getElementById("inventory");
    var addIngredientButton = document.getElementById("renderFormButton");
    var cancelIngredientButton = document.getElementById("cancelFormButton");
    if (inputForm && recipes) {
      inputForm.style.display = "flex";
      recipes.style.display = "none"
      addIngredientButton!.style.display = "none";
      cancelIngredientButton!.style.display = "flex";
    }
  }

  cancelForm() {
    var inputForm = document.getElementById("input-form");
    var recipes = document.getElementById("inventory");
    var addIngredientButton = document.getElementById("renderFormButton");
    var cancelIngredientButton = document.getElementById("cancelFormButton");
    if (inputForm && recipes) {
      inputForm.style.display = "none";
      recipes.style.display = "flex"
      addIngredientButton!.style.display = "flex";
      cancelIngredientButton!.style.display = "none";
    }
  }
  

  submitIngredient() {
    this.createNewIngredient(this.inputFormDetails.value);
    this.inputFormDetails.reset();
  }

  async createNewIngredient(newRecipe: any) {
    await this.InventoryService.createNewIngredient(newRecipe).subscribe((data) => {
      var insertedID = data[0]._id;
      console.log("inserted oid, ", insertedID);
      console.log("data ", data);
      console.log("data inventoryID ", data[0].recipeID);
      this.InventoryService.addIngredientToInventory(this.ingredientUUID).subscribe((data) => {
        console.log(data);
      });
    });
    setTimeout(() => {
      this.router.navigateByUrl('/inventory', { skipLocationChange: true }).then(() => {
        location.reload();
      });
    }, 1000);
  }
}
