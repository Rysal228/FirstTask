import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private Url = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) {}

  checkEmail(email: string): Observable<User[]> {
    //console.log(this.http.get<User[]>(`${this.Url}?email=${email}`));
     return this.http.get<User[]>(`${this.Url}?email=${email}`);
     
  }
  
  getUserModules(userId: number): Observable<User> {
    return this.http.get<User>(`${this.Url}/${userId}`);
    //return this.http.get<User>(`${this.Url}/${userId}/modules`);
  }


}
