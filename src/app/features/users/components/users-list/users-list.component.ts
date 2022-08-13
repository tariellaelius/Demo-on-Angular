import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../../models/user.model';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input() users: User[] = [];
  @Output() userUpdate = new EventEmitter();
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
  ];

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void { }

  openDialog(user: User) {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(success => success && this.userUpdate.emit());
  }

}
