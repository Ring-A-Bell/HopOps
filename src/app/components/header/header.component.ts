import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private login: LoginService) { }

  ngOnInit(): void {
    if (this.login.isLoggedIn) {
      this.hideLoginButton();
    }
  }

  hideLoginButton(): void {
    var loginButton = document.getElementById("login-btn");
    var profileButton = document.getElementById("profile-btn");
    if (loginButton && profileButton) {
      loginButton.style.display = "none";
      profileButton.style.display = "flex";
    }
  }
}
