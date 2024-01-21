import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre = 'Application de gestion de devoirs';
  showFiller = false;

  constructor(private authService: AuthService,
    private router:Router) {}

  login(username: string, password: string) {
    if(!this.authService.isLoggedIn()) {
      const loggedIn = this.authService.logIn(username, password);
      if (loggedIn) {
        console.log('logged in');
      } else {
        console.log('nom d\'utilisateur ou mot de passe invalide');
      }
    }
    else {
      this.authService.logOut();
      console.log('logged out');
      this.router.navigate(['home']);
    }
  }
}
