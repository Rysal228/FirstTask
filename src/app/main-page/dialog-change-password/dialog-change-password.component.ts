import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'dialog-change-password',
  templateUrl: 'dialog-change-password.component.html',
  styleUrl: './dialog-change-password.component.scss',
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
    ReactiveFormsModule
  ],
})
export class DialogChangePasswordComponent {

  constructor(
    private dialogRef: MatDialogRef<DialogChangePasswordComponent>,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.dialogRef.updateSize('400px', 'auto');
    this.dialogRef.addPanelClass("chemgePasWindow");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hideCurrentPassword = true;
  hideNewPassword = true;
  hideNewRepeatPassword = true;

  togglePasswordVisibility(property: 'hideCurrentPassword' | 'hideNewPassword' | 'hideNewRepeatPassword') {
    this[property] = !this[property];
  }

  changePasswordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    repeatNewPassword: ['', Validators.required]
  });

  onSubmitChangePassword(){
    if (this.changePasswordForm.valid) {
      const currentPassword = this.changePasswordForm.get('currentPassword')!.value;
      const newPassword = this.changePasswordForm.get('newPassword')!.value;
      const newRepeatPassword = this.changePasswordForm.get('repeatNewPassword')!.value;
     

      if ((currentPassword !== null && newPassword !== null && newRepeatPassword !== null) &&( newPassword === newRepeatPassword)) {
        this.authService.changePassword(currentPassword, newPassword).subscribe({
          next : response => {
            console.log('Пароль успешно изменен', response);
            this.dialogRef.close();
          },
          error: error => {
            console.log('Ошибка при изменении пароля', error);
          }
        });
      } else {
        console.log('Новый пароль и его повторение не совпадают.');
      }
    } else {
      console.log('Форма не валидна.');
    }
  }
}