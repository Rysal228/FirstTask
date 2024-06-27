import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSlideToggleModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FirstTask';
}
