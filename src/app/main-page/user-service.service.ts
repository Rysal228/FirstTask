import { Injectable } from '@angular/core';
import { User } from '../iuser';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private currentUser : User | null = null;

  setUser(users: User)
  {
    this.currentUser = users;
  }

  getUser(): User | null {
    //console.log(this.currentUser)
    return this.currentUser;
    
  }

   clearUser() {
     this.currentUser = null;
     return this.currentUser;
   }
   
   getUserModules(): any[] {
    return this.currentUser ? this.currentUser.modules : [];
  }

  constructor() { }
}
