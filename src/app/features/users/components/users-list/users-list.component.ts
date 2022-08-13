import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input() users: User[] = [];
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

  constructor() { }

  ngOnInit(): void { }

}
