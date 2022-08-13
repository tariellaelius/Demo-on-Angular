import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${UserService.url}/users`);
  }

  createUser(user: User) {
    return this.http.post<User>(`${UserService.url}/users`, user);
  }

}
