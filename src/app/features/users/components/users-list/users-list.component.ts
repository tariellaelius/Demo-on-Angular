import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnChanges {

  @Input() users: User[] = [];
  @Output() userUpdate = new EventEmitter();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'email',
    'gender',
    'country',
    'state',
    'city',
    'address',
    'pinCode',
    'edit',
    'delete',
  ];

  dataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(): void {
    this.dataSource.data = this.users;
  }
  
  openDialog(user: User) {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(success => success && this.userUpdate.emit());
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(() => this.userUpdate.emit());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
