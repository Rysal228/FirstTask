import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserServiceService } from '../main-page/user-service.service';
import { AuthService } from '../auth.service';
import { User } from '../iuser';
import { FormBuilder } from '@angular/forms';
import { StorageService } from '../storage.service';
import {MatButtonModule} from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, MatSlideToggleModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: 'auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  authForm = this.fb.group({
    //grant_type: ['password'],
    login: ['', Validators.required],
    password: ['', Validators.required],
  })

  loggingInError: string = ''

  isLoggedIn = false;
  isLoginFailed = false;
  hide = true;
  errorMessage = '';
  // login = new FormControl('', [Validators.required]);
  // password = new FormControl('', Validators.required);
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private UserServiceService: UserServiceService,
    private fb: FormBuilder,
    private storageService: StorageService) {}

  colorValue() {
    return 'red'
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      //должен обновлять токен, авторизованному чуваку, если тот попадает на страницу auth
      this.authService.refreshToken();
      //и возвращать на страницу для работы
      this.router.navigate(['/'])
    }
  }

  onSubmit(): void {
    this.authService.login(this.authForm.value).subscribe({
      next: data => {
        this.storageService.saveToken(data);

        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.router.navigate(['/']);
      },
      error: err => {
        if (err instanceof HttpErrorResponse && err.status === 400) {
          //console.log('Error: ', err)
          this.loggingInError = err.error;
          //console.log('loggingInError', this.loggingInError);
          this.isLoginFailed = true;
          // console.log(err)
        }
      },

    });
  }
  // onSubmit() {
  //   if (this.authForm.valid) {
  //     const login = this.login.value;
  //     const password = this.password.value;
  //     if ((login !== null) && (password!== null)) {
  //       this.authService.checkLogin(login).subscribe(
  //         (users: User[]) => {
  //             const user = users.find(u => u.login === login);
  //             if (user) {
  //             this.authService.getUserModules(user.id).subscribe(
  //               (fullUser: User) => { 
  //                 console.log(fullUser);
  //                 this.UserServiceService.setUser(fullUser); 
  //                 this.router.navigate(['/']);
                 
  //                  //this.UserServiceService.setUser(user);
  //               },
  //             );
  //           } else {
  //             console.log('Login not found');
  //           }
  //         },
  //         (error: any) => {
  //           console.error('Error checking login:', error);
  //         }
  //       );
  //     } else {
  //       console.error('Login value is null');
  //     }
  //   }
  // }

}
