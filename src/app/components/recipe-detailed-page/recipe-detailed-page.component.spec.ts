import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailedPageComponent } from './recipe-detailed-page.component';

describe('RecipeDetailedPageComponent', () => {
  let component: RecipeDetailedPageComponent;
  let fixture: ComponentFixture<RecipeDetailedPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeDetailedPageComponent]
    });
    fixture = TestBed.createComponent(RecipeDetailedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
