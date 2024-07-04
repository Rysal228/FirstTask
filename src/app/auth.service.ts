// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable, delay, tap } from 'rxjs';
// import { User } from './iuser';
// import { StorageService } from './storage.service';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })

// export class AuthService  {
//   private Url = 'http://10.100.3.140:8000/signIn'; 

//   constructor(
//     private http: HttpClient,
//     private storageService: StorageService,
//     private router: Router) {}
  
//   getUserModules(userId: number): Observable<User> {
//     return this.http.get<User>(`${this.Url}/${userId}`);
//     //return this.http.get<User>(`${this.Url}/${userId}/modules`);
//   }

 
//   token : string ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk5MDI2NzcsImxvZ2luIjoidGVzdF91c2VyMSJ9.2iWiUiEc8MprU0BdqLMX65UPcmLDiXRLkcE0VfZu4h8';

//   changePassword(oldPasswordForm: string, newPasswordForm: string): Observable<any> {
//     const token = localStorage.getItem('zup-token');
//     const body = {
//       oldPassword: oldPasswordForm,
//       newPassword: newPasswordForm
//     };
//     console.log(body);
//     const changePassword = 'http://10.100.3.140:8000/changePassword'
//     console.log(`${this.Url}/${changePassword}`)
//     return this.http.post<any>(`${changePassword}`, body, { headers : new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${this.token}`
//     })
//     });
//   }


//   login(body: any): Observable<any> {
//     const bodyRequest = {
//       login: body.login,
//       pass: body.password
//     }
//     // const bodyRequest = new HttpParams()
//     //    // .set('grant_type', body.grant_type)
//     //     .set('username', body.login)
//     //     .set('password', body.password)
//     //    // .set('scope', body.scope)
//     window.localStorage.setItem('zup-username', body.login);
//     console.log(bodyRequest);
//     console.log( this.http.post<any>(
//       this.Url, JSON.stringify(bodyRequest)));
//     return this.http.post<any>(
//         this.Url, JSON.stringify(bodyRequest)
//     )
// }

//   refreshToken(): Observable<any> {
//     const body = new HttpParams()
//         .set('grant_type', 'refresh_token')
//         .set('refresh_token', this.storageService.getRefreshToken())

//     return this.http.post<any>(this.Url, body).pipe(tap(responseData => {
//         this.storageService.saveToken(responseData)
//     }), delay(200));
// }

//   logout() {
//     this.storageService.isLoggedOut();
//     window.localStorage.removeItem('zup-username');
//     this.router.navigate(['/MainPage']);
// }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, delay, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { User } from './iuser';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  private Url = 'http://10.100.3.140:8000'; 
  private UrlChange = 'http://10.100.3.140:8001'
  private signIn = 'signIn'
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router) {}
  private token = JSON.parse(localStorage.getItem('zup-token') || '{}');
  changePassword(oldPasswordForm: string, newPasswordForm: string): Observable<any> {
    //const token = localStorage.getItem('zup-token');
    const body = {
      oldPassword: oldPasswordForm,
      newPassword: newPasswordForm
    };
    //console.log(body);
    const changePassword = 'changePassword'
    //console.log(`${this.Url}/${changePassword}`)
    return this.http.put<any>(`http://10.100.3.140:8080/changePassword`, body, { headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })
    });
  }


  login(body: any): Observable<any> {
    const bodyRequest = {
      login: body.login,
      pass: body.password
    }
    // const bodyRequest = new HttpParams()
    //    // .set('grant_type', body.grant_type)
    //     .set('username', body.login)
    //     .set('password', body.password)
    //    // .set('scope', body.scope)
    window.localStorage.setItem('zup-username', body.login);
    return this.http.post<any>(
        `${this.Url}/${this.signIn}`, JSON.stringify(bodyRequest)
    ).pipe(switchMap(() => this.getUserModules()))
}

  refreshToken(): Observable<any> {
    const body = new HttpParams()
        .set('grant_type', 'refresh_token')
        .set('refresh_token', this.storageService.getRefreshToken())

    return this.http.post<any>(`${this.Url}/${this.signIn}`, body).pipe(tap(responseData => {
        this.storageService.saveToken(responseData)
    }), delay(200));
}

  logout() {
    this.storageService.isLoggedOut();
    window.localStorage.removeItem('zup-username');
    this.router.navigate(['/']);
}
  getUserModules(): Observable<User> {
    return this.http.get<User>(`http://10.100.3.140:8080/user`,{
      headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
      })
    })
  }
}
