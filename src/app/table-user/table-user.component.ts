import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { AuthService } from '../auth.service';
import { Module } from '../iuser';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-table-user',
  standalone: true,
  imports: [CommonModule,MatTableModule],
  templateUrl: 'table-user.component.html',
  styleUrl: './table-user.component.scss'
})
export class TableUserComponent {
  displayedColumns: string[] = ['position', 'name', 'create', 'reading', 'update', 'delete', 'list'];
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
        console.log(user);
        this.dataSource = user.scope.map((module, index) => ({
          ...module,
          position: index + 1,
          create: module.rights.includes('create'),
          reading: module.rights.includes('read'),
          update: module.rights.includes('update'),
          delete: module.rights.includes('delete'),
          list: module.rights.includes('list')
        }));
      },
      error: err => {
        console.error('Ошибка при загрузке модулей:', err);
      }
    });
  }
}
