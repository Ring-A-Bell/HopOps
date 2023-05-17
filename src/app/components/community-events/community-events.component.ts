import { Component } from '@angular/core';
import { CommunityEventsService } from '../../services/community-events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community-events',
  templateUrl: './community-events.component.html',
  styleUrls: ['./community-events.component.scss'] 
})
export class CommunityEventsComponent {
  event: any; // Add the 'event' property declaration here
  constructor(private CommunityEventsService: CommunityEventsService, private router: Router) { }

  jsongatherings: any;

  ngOnInit(): void {
    this.CommunityEventsService.getAllCommunityEvents().subscribe((data: any) => this.jsongatherings = data[0].recipes);

}
}
