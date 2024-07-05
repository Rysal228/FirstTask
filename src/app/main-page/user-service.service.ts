import { Injectable } from '@angular/core';
import { User } from '../iuser';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private currentUser : User | null = null;
   
  //  getUserModules(): any[] {
  //   return this.currentUser ? this.currentUser.scope : [];
  // }

  constructor() { }
}
