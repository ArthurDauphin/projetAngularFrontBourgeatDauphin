import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdminUser()) {
      console.log('Authentifié en tant qu\'admin');
      return true;
    } else {
      console.log('Non authentifié ou non admin');
      this.router.navigate(['home']);
      return false;
    }
  }
}
