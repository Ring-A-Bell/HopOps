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

  onDetailedViewRecipe() {
    console.log("setting current recipe -> ", this.recipe);
    this.recipeService.setSelectedRecipe(this.recipe);
  }
}