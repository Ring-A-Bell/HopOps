import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent {
  constructor(private recipeService: RecipeService, private router: Router, private formBuilder: FormBuilder) { }

  jsonRecipes: any;

  inputFormDetails = this.formBuilder.group({
    recipeID: "",
    title: "",
    description: "",
    image: "",
    body: "",
    recipeIngredients: { 
      ingredient: "",
      quantity: 0 
    },
    favorite: false
  });

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
  }

  addIngredient() { }

  submitRecipe() {
    console.log(this.inputFormDetails.value);
    console.log(this.inputFormDetails);
    this.inputFormDetails.reset();
  }

  createNewRecipe() {
    //console.log(this.newRecipe);
    //this.recipeService.createNewRecipe(this.newRecipe).subscribe((data) => {
      //var insertedID = data[0]._id;
      //this.recipeService.addRecipeToUserList(insertedID).subscribe((data) => {
       // console.log(data);
     // });
   // });
   // this.router.navigateByUrl('/my-recipes', { skipLocationChange: true }).then(() => {
      //location.reload();
   // });
  }
}
