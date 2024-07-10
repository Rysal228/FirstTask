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
import { AuthService } from '../../auth.service';


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
    public dialogRef: MatDialogRef<DialogCreateUserComponent>,
    private authService : AuthService
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
    login: ['',Validators.pattern('^[a-zA-Z][a-zA-Z0-9_-]{3,20}$')],
    name: ['', Validators.required],
    currentPassword: ['', Validators.pattern('^[a-zA-Z][a-zA-Z0-9_-]{5,20}$')],
    repeatNewPassword: ['', Validators.required]
  });

  onSubmitCreateUser(){
    if (this.createUserForm.valid) {
      const login = this.createUserForm.get('login')!.value;
      const name = this.createUserForm.get('name')!.value;
      const currentPassword = this.createUserForm.get('currentPassword')!.value;
      const newRepeatPassword = this.createUserForm.get('repeatNewPassword')!.value;
      if ((login !== null && currentPassword !== null && name !== null) && ((newRepeatPassword == currentPassword)))
        {
        this.authService.createUser(login,name,currentPassword).subscribe(
          {
            next : respone => {
              console.log("response:",respone)
            },
            error : err => {
              console.log("error:", err)
            }
          }
        )
      }
    }
  }
}

