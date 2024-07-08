import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AuthService } from '../../auth.service';
import { Module, User } from '../../iuser';
import { StorageService } from '../../storage.service';
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: 'table-users.component.html',
  styleUrl: './table-users.component.scss'
})
export class TableUsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'login'];
  dataSource = new MatTableDataSource<User>([]);
  //dataSource: User[] = []; 
  constructor(
    private authService: AuthService,
    private router: Router){}

    ngOnInit(): void {
      this.loadUsers();
    }
    loadUsers(): void {
      this.authService.getUserslist().subscribe({
        next: (people: User[]) => {
          console.log('people:',people)
          this.dataSource.data = people;
         // this.dataSource = users.Users; зачекать с dataSource
         console.log('this.dataSource.data',this.dataSource.data);
        },
        error: err => {
          console.error('Ошибка при загрузке списка пользователей:', err);
        }
      });
    }
    

    navigateToUserRights(login: string): void {
      this.router.navigate(['/user', login]);
    }
}
