import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AuthService } from '../../auth.service';
import { Module, User } from '../../iuser';
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule
  ],
  templateUrl: 'table-users.component.html',
  styleUrl: './table-users.component.scss'
})

export class TableUsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'login'];
  //dataSource = new MatTableDataSource<User>([]);
  dataSource: User[] = [];
  dataSource2?: MatTableDataSource<User>;
  //dataSource: User[] = []; 

  paginator: any;
  itemPerPage = 10;
  currentPage = 1;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  
length = 0;
pageSize = 1;
pageIndex = 0;
pageSizeOptions = [1, 10, 15, 20, 25];

hidePageSize = false;
showPageSizeOptions = true;
showFirstLastButtons = true;
disabled = false;

pageEvent: PageEvent | undefined;

handlePageEvent(event: PageEvent) {
  this.pageEvent = event;
  this.length = event.length;
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;

  if (this.dataSource2)
    this.dataSource2.data = this.dataSource.slice(
      event.pageIndex * event.pageSize,
      (event.pageIndex + 1) * event.pageSize
    );
  }

    ngOnInit(): void {
      this.loadUsers();
      this.dataSource2 = new MatTableDataSource<User>(this.dataSource);
    }
    loadUsers(): void {
      this.authService.getUserslist().subscribe({
        next: (people: User[]) => {
          console.log('people:',people)
          this.length = people.length;
          this.dataSource = people;
         console.log('this.dataSource.data',this.dataSource);
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
       this.authService.getTableUser(login).subscribe({
         next: User => {
           console.log(User)
         },
         error: err => {
           console.log('Ошибка при загрузке модулей пользователя:', err)
         }
       });
    }
     navigateToUserRights(login: string): void {
       this.router.navigate(['/user', login]);
     }

}
