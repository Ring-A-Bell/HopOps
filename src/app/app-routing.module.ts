import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import { SalesPageComponent } from './components/sales-page/sales-page.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  { path: 'my-recipes', component: RecipePageComponent },
  { path: 'sales', component: SalesPageComponent },
  { path: '', component: HomePageComponent},
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
