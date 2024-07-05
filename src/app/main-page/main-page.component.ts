import { ChangeDetectionStrategy, Component, inject, model, signal, OnInit,ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '../auth/auth.component';
import { UserServiceService } from './user-service.service';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { TableUserComponent } from './table-user/table-user.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import { User } from '../iuser';
import { AuthService } from '../auth.service';
import { DialogChangePasswordComponent } from './dialog-change-password/dialog-change-password.component';
import { DialogCreateUserComponent } from './dialog-create-user/dialog-create-user.component';
import { StorageService } from '../storage.service';

export interface DialogData {
  currentPassword: string;
  newPassword: string;
}

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MatTabsModule,CommonModule, AuthComponent,MatIconModule,MatTooltipModule, MatButtonModule, MatBottomSheetModule,MatMenuModule,TableUserComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  user: User | null = null; 
  userName = localStorage.getItem('zup-username');

  constructor(
    private router: Router, 
    private dialog: MatDialog,
    private authService: AuthService,
    private storageService: StorageService) {} 

// Чтобы неавт. пользователь не смог зайти на главную страницу  
  ngOnInit() {
    if (!localStorage.getItem('zup-token')) {
      this.router.navigate([''])
    }
  }

  onExit(){
    //this.user = this.userService.clearUser();
    this.authService.logout();
    // this.route.navigate(['/MainPage']);
    //console.log(this.user);
  }

  onSettings(){
    
  }

  openDialogChangePassword(): void {
    this.dialog.open(DialogChangePasswordComponent,{
      panelClass: 'custom-modalbox'
    });
  }

  openDialogCreateUser(): void {
    this.dialog.open(DialogCreateUserComponent,{
      panelClass: 'custom-modalbox'
    });
  }

}

