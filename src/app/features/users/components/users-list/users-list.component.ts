import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
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
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log('users list init')
    this.userService.getUsers().subscribe(users => this.users = users);
  }

}
