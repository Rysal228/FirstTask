import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, delay, tap } from 'rxjs';
import { User } from './iuser';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  private Url = 'http://localhost:3000/users'; 
  constructor(
    private http: HttpClient,
    private storageService: StorageService) {}

  checkLogin(login: string): Observable<User[]> {
    //console.log(this.http.get<User[]>(`${this.Url}?email=${email}`));
     return this.http.get<User[]>(`${this.Url}?email=${login}`);
     
  }
  
  getUserModules(userId: number): Observable<User> {
    return this.http.get<User>(`${this.Url}/${userId}`);
    //return this.http.get<User>(`${this.Url}/${userId}/modules`);
  }


  login(body: any): Observable<any> {
    const bodyRequest = new HttpParams()
       // .set('grant_type', body.grant_type)
        .set('username', body.login)
        .set('password', body.password)
       // .set('scope', body.scope)
    window.localStorage.setItem('zup-username', body.login);
    return this.http.post<any>(
        this.Url + 'token', bodyRequest
    )
}

  refreshToken(): Observable<any> {
    const body = new HttpParams()
        .set('grant_type', 'refresh_token')
        .set('refresh_token', this.storageService.getRefreshToken())

    return this.http.post<any>(this.Url + 'token', body).pipe(tap(responseData => {
        this.storageService.saveToken(responseData)
    }), delay(200));
}
}
