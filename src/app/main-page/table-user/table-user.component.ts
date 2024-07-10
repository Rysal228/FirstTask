import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AuthService } from '../../auth.service';
import { Module } from '../../iuser';
import { StorageService } from '../../storage.service';
import { MatIconModule } from '@angular/material/icon'
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-table-user',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: 'table-user.component.html',
  styleUrl: './table-user.component.scss'
})

export class TableUserComponent {
  displayedColumns: string[] = ['position', 'name', 'create', 'reading', 'update', 'delete', 'list','link'];
  dataSource2?: MatTableDataSource<Module>;
  dataSource: Module[] = [];
  paginator: any;
  isSuperAdmin : boolean | null = this.storageService.getRoleUser();
  itemPerPage = 30;
  currentPage = 1;
  constructor(
    private authService: AuthService,
    //public dialogRef: MatDialogRef<TableUserComponent>,
    private storageService: StorageService,
  ){}

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 15, 20, 25];
  
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
    if (this.isSuperAdmin){
      this.loadCurrentUserModules();
    }
    else {
      this.loadUserModules();
    }
    this.dataSource2 = new MatTableDataSource<Module>(this.dataSource);
  }
  

  loadUserModules(): void {
    this.authService.getUserModules().subscribe({
      next: user => {
        this.dataSource = user.scope.map((module, index) => ({
          ...module,
          position: index + 1,
          create: module.rights.create,
          reading: module.rights.read,
          update: module.rights.update,
          delete: module.rights.delete,
          list: module.rights.list,
          link: module.link
        }));
  
        this.length = this.dataSource.length;
        if (this.dataSource2)
          this.dataSource2.data = this.dataSource.slice(0, this.pageSize);
      },
      error: err => {
        console.error('Ошибка при загрузке модулей:', err);
      }
    });
  }

  loadCurrentUserModules(): void {
  //   this.authService.getTableUser(login).subscribe({
  //     next: User => {
  //        this.dialog.open(TableUserComponent, {
  //        data: { User },
  //        panelClass: 'custom-modalbox'
  //      });
  //       console.log(User);
   
  //     },
  //     error: err => {
  //       console.log('Ошибка при загрузке модулей пользователя:', err)
  //     }
  //   });
   }
}

