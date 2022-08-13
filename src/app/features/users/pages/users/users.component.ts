import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../../services/user.service';
import { UserFormDialogComponent } from '../../components/user-form-dialog/user-form-dialog.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent);

    dialogRef.afterClosed().subscribe(success => success && this.getUsers());
  }
}
