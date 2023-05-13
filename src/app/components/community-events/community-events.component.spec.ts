import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityEventsComponent } from './community-events.component';

describe('CommunityEventsComponent', () => {
  let component: CommunityEventsComponent;
  let fixture: ComponentFixture<CommunityEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
