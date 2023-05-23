import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent {
  constructor(private recipeService: RecipeService, private router: Router) { }

  jsonRecipes: any;

  recipeID: string = "";
  title: string = "";
  description: string = "";
  image: string = "";
  body: string = "";
  recipeIngredients: { ingredient: string, quantity: number }[] = [];
  favorite: boolean = false;
  newRecipe: any;

  ngOnInit(): void {
    this.recipeService.getUserRecipes().subscribe((data: any) => this.jsonRecipes = data[0].recipes);
    //this.recipeService.getAllRecipes().subscribe((data: any) =>  this.jsonRecipes = data);
  }

  renderForm() {
    var inputForm = document.getElementById("input-form");
    var recipes = document.getElementById("recipes");
    if (inputForm && recipes) {
      inputForm.style.display = "flex";
      recipes.style.display = "none"
    }

    this.newRecipe = {
      recipeID: this.recipeID,
      title: this.title,
      description: this.description,
      image: this.image,
      body: this.body,
      recipeIngredients: this.recipeIngredients,
      favorite: this.favorite
    };
  }

  addIngredient() { }

  submitRecipe() {
    this.createNewRecipe();
  }

  createNewRecipe() {
    console.log(this.newRecipe);
    this.recipeService.createNewRecipe(this.newRecipe).subscribe((data) => {
      var insertedID = data[0]._id;
      this.recipeService.addRecipeToUserList(insertedID).subscribe((data) => {
        console.log(data);
      });
    });
    this.router.navigateByUrl('/my-recipes', { skipLocationChange: true }).then(() => {
      //location.reload();
    });
  }
}
