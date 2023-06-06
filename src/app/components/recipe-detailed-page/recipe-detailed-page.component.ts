import { Component, Input } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detailed-page',
  templateUrl: './recipe-detailed-page.component.html',
  styleUrls: ['./recipe-detailed-page.component.scss']
})
export class RecipeDetailedPageComponent {
  selectedRecipe: any;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    console.log("inside ngAfterViewInit");
    this.selectedRecipe = this.recipeService.getSelectedRecipe();
    console.log("Detailed recipe view -> ", this.selectedRecipe);

    this.updateRecipeIngredients();
  }

  updateRecipeIngredients(): void {
    this.selectedRecipe.recipeIngredients.forEach((ingredient: any, index: number) => {
      this.getIngredientName(ingredient.ingredient).subscribe((name: string) => {
        this.selectedRecipe.recipeIngredients[index].ingredient = name;
      });
      this.getIngredientUnit(ingredient.ingredient).subscribe((unit: string) => {
        this.selectedRecipe.recipeIngredients[index].unitSize = unit;
      });
    });
  }
  
  getIngredientName(recipeID: string): Observable<string> {
    return this.recipeService.getIngredientByID(recipeID).pipe(
      map((data: any) => data.name)
    );
  }
  
  getIngredientUnit(recipeID: string): Observable<string> {
    return this.recipeService.getIngredientByID(recipeID).pipe(
      map((data: any) => data.unitSize)
    );
  }
  
}
