import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './pages/users/users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule,
  ]
})
export class UsersModule { }
