import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  userID: string = "XleamMUl3xwt7DGbuNb1K";
  constructor(private http: HttpClient, private login: LoginService) { }

  profileDetails: any;

  ngOnInit(): void {
    let header = new HeaderComponent(this.login);
    this.login.performLogin(this.userID).subscribe((data: any) => {
      this.profileDetails = data;
      console.log("Profile details -> ", this.profileDetails);
      if(data) {
        console.log("User is logged in");
        header.hideLoginButton();
        this.login.setLoginStatus(true);
      }
    });
  }
}
