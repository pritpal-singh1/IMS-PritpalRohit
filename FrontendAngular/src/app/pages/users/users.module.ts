import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AllUsersComponent } from './all-users/all-users.component';
import { AddUserComponent } from './add-user/add-user.component';


@NgModule({
  declarations: [AllUsersComponent, AddUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
