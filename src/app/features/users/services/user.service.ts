import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static url = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${UserService.url}/users`);
  }

  createUser(user: User) {
    return this.http.post<User>(`${UserService.url}/users`, user);
  }

  updateUser(user: User) {
    return this.http.patch<User>(`${UserService.url}/users/${user._id}`, user);
  }

  deleteUser(user: User) {
    return this.http.delete(`${UserService.url}/users/${user._id}`);
  }

}
