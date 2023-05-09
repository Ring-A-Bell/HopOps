import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { json } from 'body-parser';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent {
  constructor(private http: HttpClient) { }

  jsonRecipes: any;

  ngOnInit(): void{
    var jsonObj: any;
    this.http.get("http://localhost:8080/app/userrecipes/YPs-zlGU6gwxOAH3O-zWb").subscribe((data) => {
    console.log(data);
    jsonObj = JSON.parse(JSON.stringify(data));
    console.log("This is without\n", jsonObj);
    this.jsonRecipes = jsonObj[0].recipes;
    console.log("This is without2\n", this.jsonRecipes);
    console.log();
    });
  }

}
