import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { set } from 'mongoose';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent {
  constructor(private recipeService: RecipeService, private router: Router, private formBuilder: FormBuilder) { }

  jsonRecipes: any;

  inputFormDetails = this.formBuilder.group({
    title: "",
    description: "",
    image: "",
    body: "",
    recipeIngredients: [{ }],
    favorite: false
  });

  ngOnInit(): void {
    this.recipeService.getUserRecipes().subscribe((data: any) => {
      console.log(data);
      console.log(data[0].recipes);
      this.jsonRecipes = data;
    });
    console.log(this.jsonRecipes);
    //this.recipeService.getAllRecipes().subscribe((data: any) =>  this.jsonRecipes = data);
  }

  renderForm() {
    var inputForm = document.getElementById("input-form");
    var recipes = document.getElementById("recipes");
    var addRecipeButton = document.getElementById("renderFormButton");
    var cancelRecipeButton = document.getElementById("cancelFormButton");
    if (inputForm && recipes) {
      inputForm.style.display = "flex";
      recipes.style.display = "none"
      addRecipeButton!.style.display = "none";
      cancelRecipeButton!.style.display = "flex";
    }
  }

  cancelForm() {
    var inputForm = document.getElementById("input-form");
    var recipes = document.getElementById("recipes");
    var addRecipeButton = document.getElementById("renderFormButton");
    var cancelRecipeButton = document.getElementById("cancelFormButton");
    if (inputForm && recipes) {
      inputForm.style.display = "none";
      recipes.style.display = "flex"
      addRecipeButton!.style.display = "flex";
      cancelRecipeButton!.style.display = "none";
    }
  }

  addIngredient() { }

  submitRecipe() {
    this.createNewRecipe(this.inputFormDetails.value);
    this.inputFormDetails.reset();
  }

  async createNewRecipe(newRecipe: any) {
    await this.recipeService.createNewRecipe(newRecipe).subscribe((data) => {
      var insertedID = data[0]._id;
      console.log(insertedID);
      console.log(data);
      this.recipeService.addRecipeToUserList(insertedID).subscribe((data) => {
        console.log(data);
      });
    });
    setTimeout(() => {
      this.router.navigateByUrl('/my-recipes', { skipLocationChange: true }).then(() => {
        location.reload();
      });
    }, 1000);
  }
}
