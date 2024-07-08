import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AuthService } from '../../auth.service';
import { Module, User } from '../../iuser';
import { StorageService } from '../../storage.service';
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    RouterModule 
  ],
  templateUrl: 'table-users.component.html',
  styleUrl: './table-users.component.scss'
})
export class TableUsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'login'];
  dataSource = new MatTableDataSource<User>([]);
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
         //console.log('this.dataSource.data',this.dataSource.data);
        },
        error: err => {
          console.error('Ошибка при загрузке списка пользователей:', err);
        }
      });
    }
    
    navigate(login : string){
      //console.log(login);
      this.authService.getModules().subscribe({
        next: modules => {
          console.log('Модули:', modules)
        },
        error: err => {
          console.log('Ошибка при загрузке модулей:', err)
        }
      })
      // this.authService.getTableUser(login).subscribe({
      //   next: User => {
      //     console.log(User)
      //   },
      //   error: err => {
      //     console.log('Ошибка при загрузке модулей пользователя:', err)
      //   }
      // });
    }
    // navigateToUserRights(login: string): void {
    //   this.router.navigate(['/user', login]);
    // }
}
