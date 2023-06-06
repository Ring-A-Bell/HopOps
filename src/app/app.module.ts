import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import { RecipeService } from './services/recipe.service';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SalesPageComponent } from './components/sales-page/sales-page.component';
import { CommunityEventsComponent } from './components/community-events/community-events.component';
import { InventoryComponent } from './components/inventory-page/inventory.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule} from '@angular/material/core';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { IonicModule } from '@ionic/angular';
import { RecipeDetailedPageComponent } from './components/recipe-detailed-page/recipe-detailed-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RecipeCardComponent,
    RecipePageComponent,
    PagenotfoundComponent,
    HomePageComponent,
    SalesPageComponent,
    CommunityEventsComponent,
    InventoryComponent,
    EventCardComponent,
    RecipeDetailedPageComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    LoginPageComponent,
    IonicModule,
    SlickCarouselModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
