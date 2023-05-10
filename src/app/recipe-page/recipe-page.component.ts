import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent {
  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  jsonRecipes: any;

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((data: any) => this.jsonRecipes = data[0].recipes);
  }
}
