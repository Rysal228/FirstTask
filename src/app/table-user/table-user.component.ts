import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { AuthService } from '../auth.service';
import { Module } from '../iuser';
import { StorageService } from '../storage.service';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-table-user',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatIconModule],
  templateUrl: 'table-user.component.html',
  styleUrl: './table-user.component.scss'
})
export class TableUserComponent {
  displayedColumns: string[] = ['position', 'name', 'create', 'reading', 'update', 'delete', 'list','link'];
  dataSource: Module[] = [];
  
  constructor(
    private authService: AuthService,
    private storageService: StorageService){}
  ngOnInit(): void {
    this.loadUserModules();
  }

  loadUserModules(): void {

    this.authService.getUserModules().subscribe({
      next: user => {
        console.log(user.scope);

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
      },
      error: err => {
        console.error('Ошибка при загрузке модулей:', err);
      }
    });
  }
}
