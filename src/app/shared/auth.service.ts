import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    { username: 'admin', password: 'adminpass', isAdmin: true },
    { username: 'user', password: 'userpass', isAdmin: false },
  ];
  private currentUser: User | null = null;

  constructor() {}

  logIn(username: string, password: string) {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logOut() {
    this.currentUser = null;
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  isAdminUser() {
    return this.isLoggedIn() && this.currentUser?.isAdmin;
  }
}
