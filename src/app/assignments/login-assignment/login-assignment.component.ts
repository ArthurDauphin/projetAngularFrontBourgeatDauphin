import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login-assignment',
  templateUrl: './login-assignment.component.html',
  styleUrls: ['./login-assignment.component.css']
})
export class LoginAssignmentComponent {

  username = '';
  password = '';

  constructor(private authService: AuthService,
    private router: Router,
    private http : HttpClientModule) {}

  onLogin() {
    const loggedIn = this.authService.logIn(this.username, this.password);
    if (!loggedIn) {
      alert('Nom d\'utilisateur ou mot de passe invalide');
      
    }
    this.router.navigate(['home']);
  }
}
