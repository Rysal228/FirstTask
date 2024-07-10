import { Injectable } from '@angular/core';

const USER_KEY = 'zup-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private userRole: boolean | null = null;

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY);

    return user? true : false;
  }

  public getRefreshToken(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
        const refresh_token = JSON.parse(user).refresh_token;
        return refresh_token;
    }
  }

  public saveToken(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

   saveRoleUser(user: boolean): void {
    this.userRole = user;
    console.log('Пользователь:', this.userRole);
  }

  getRoleUser(): boolean | null {
    return this.userRole;
  }

  constructor() { }

  public isLoggedOut() {
    //console.log(window.localStorage.getItem(USER_KEY));
    window.localStorage.removeItem(USER_KEY);
  }
}
