import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
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


@Component({
  selector: 'app-dialog-create-user',
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
    MatDividerModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-create-user.component.html',
  styleUrl: './dialog-create-user.component.scss'
})

export class DialogCreateUserComponent {
  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<DialogCreateUserComponent>
  ) {}

  ngOnInit() {
    this.dialogRef.updateSize('400px', 'auto');
    this.dialogRef.addPanelClass("createUserWindow");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hideCurrentPassword = true;
  hideNewRepeatPassword = true;

  togglePasswordVisibility(property: 'hideCurrentPassword' | 'hideNewRepeatPassword') {
    this[property] = !this[property];
  }

  createUserForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    repeatNewPassword: ['', Validators.required]
  });

  onSubmitCreateUser(){
    if (this.createUserForm.valid) {
      const currentPassword = this.createUserForm.get('login')!.value;
      const newPassword = this.createUserForm.get('currentPassword')!.value;
      const newRepeatPassword = this.createUserForm.get('repeatNewPassword')!.value;
    }
  }
}

