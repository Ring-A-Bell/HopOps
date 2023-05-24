import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import { SalesPageComponent } from './components/sales-page/sales-page.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CommunityEventsComponent } from './components/community-events/community-events.component';
import { InventoryComponent } from './components/inventory-page/inventory.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  { path: 'my-recipes', component: RecipePageComponent },
  { path: 'sales', component: SalesPageComponent },
  { path: 'community-events', component: CommunityEventsComponent },
  { path: 'inventory', component:  InventoryComponent},
  { path: '', component: HomePageComponent},
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
