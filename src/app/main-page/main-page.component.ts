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
import {FormsModule} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { TableUserComponent } from '../table-user/table-user.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import { User } from '../iuser';

export interface DialogData {
  animal: string;
  name: string;
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
  userName = "Manchik";

  constructor(private userService: UserServiceService, private route: Router, private _bottomSheet: MatBottomSheet) {} 

  
  ngOnInit() {
    this.user = this.userService.getUser(); 
    //console.log(this.user.role);
  }

  onExit(){
    this.user = this.userService.clearUser();
    this.route.navigate(['/MainPage']);
    //console.log(this.user);
  }

  onSettings(){
    
  }

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name: this.name(), animal: this.animal()},
    });

  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrl: './main-page.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);

  
  onNoClick(): void {
    this.dialogRef.close();
  }

  hideCurrentPassword = true;
  hideNewPassword = true;
  hideNewRepeatPassword = true;

  togglePasswordVisibility(property: 'hideCurrentPassword' | 'hideNewPassword' | 'hideNewRepeatPassword') {
    this[property] = !this[property];
  }
}
