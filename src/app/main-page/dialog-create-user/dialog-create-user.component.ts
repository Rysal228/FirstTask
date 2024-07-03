import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {FormsModule} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

export interface DialogData {
  animal: string;
  name: string;
}

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
  ],
  templateUrl: './dialog-create-user.component.html',
  styleUrl: './dialog-create-user.component.scss'
})

export class DialogCreateUserComponent {
  constructor(public dialogRef: MatDialogRef<DialogCreateUserComponent>) {}

  ngOnInit() {
    this.dialogRef.updateSize('400px', 'auto');
    this.dialogRef.addPanelClass("createUserWindow");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hideNewPassword = true;
  hideNewRepeatPassword = true;

  togglePasswordVisibility(property: 'hideNewPassword' | 'hideNewRepeatPassword') {
    this[property] = !this[property];
  }
}

