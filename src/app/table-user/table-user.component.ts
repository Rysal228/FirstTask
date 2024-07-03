import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { UserServiceService } from '../main-page/user-service.service';
import { Module } from '../iuser';



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
  constructor(private userServiceService: UserServiceService){}
  ngOnInit(): void {
    this.loadUserModules();
  }

  loadUserModules(): void {
    const modules = this.userServiceService.getUserModules();
    //console.log(modules); 
    this.dataSource = modules.map((module, index) => ({
      ...module,
      position: index + 1,
      //name: module.name,
      create: module.rights.create,
      reading: module.rights.read,
      update: module.rights.update,
      delete: module.rights.delete,
      list: module.rights.list
    }));
    console.log(this.dataSource);
  }
}
