import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent {
  constructor(private recipeService: RecipeService, private router: Router) { }

  jsonRecipes: any;

  ngOnInit(): void {
    this.recipeService.getUserRecipes().subscribe((data: any) => this.jsonRecipes = data[0].recipes);
    //this.recipeService.getAllRecipes().subscribe((data: any) =>  this.jsonRecipes = data);
  }

  createNewRecipe() {
    this.recipeService.createNewRecipe().subscribe((data) => {
      var insertedID = data[0]._id;
      this.recipeService.addRecipeToUserList(insertedID).subscribe((data) => {
        console.log(data);
      });
    });
    this.router.navigateByUrl('/my-recipes', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
}
