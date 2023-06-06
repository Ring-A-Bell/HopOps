import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  userID: string = "XleamMUl3xwt7DGbuNb1K";
  constructor(private http: HttpClient) { }

  profileDetails: any;

  ngOnInit(): void {
    this.http.get("/app/users/" + this.userID).
    subscribe((data: any) => {
      this.profileDetails = data;
      console.log("Profile details -> ", this.profileDetails);
    });
    if(this.profileDetails) {
      //this.header.hideLoginButton();
    }
  }
}
