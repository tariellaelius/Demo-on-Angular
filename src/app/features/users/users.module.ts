import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './pages/users/users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { UserRoutingModule } from './user-routing.module';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserFormDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UsersModule { }
