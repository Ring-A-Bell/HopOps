import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  hideLoginButton(): void {
    var loginButton = document.getElementById("login-btn");
    var profileButton = document.getElementById("profile-btn");
    if (loginButton && profileButton) {
      loginButton.style.display = "none";
      profileButton.style.display = "flex";
    }
  }
}
