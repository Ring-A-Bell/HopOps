import { TestBed } from '@angular/core/testing';

import { CommunityEventsService } from './community-events.service';

describe('CommunityEventsService', () => {
  let service: CommunityEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
