import { Component, Input } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detailed-page',
  templateUrl: './recipe-detailed-page.component.html',
  styleUrls: ['./recipe-detailed-page.component.scss']
})
export class RecipeDetailedPageComponent {
  @Input() selectedRecipe: any;

  constructor(private recipeService: RecipeService) { }

  /*ngAfterViewInit(): void {
    console.log("inside ngAfterViewInit");
    setTimeout(() => {
      this.recipeService.getSelectedRecipe().subscribe((data: any) => {
      this.selectedRecipe = data;
      console.log("Detailed recipe view -> ", this.selectedRecipe);
    });
    }, 2000); 
    console.log("after subscribe");
  }*/
}
