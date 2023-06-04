import { Component, Input } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';


@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
  @Input() recipe: any;

  constructor(private recipeService: RecipeService) { }

  onDetailedViewRecipe(recipe: any) {
    this.recipeService.setSelectedRecipe(recipe);
    console.log("setting current recipe -> ", recipe);
  }
}