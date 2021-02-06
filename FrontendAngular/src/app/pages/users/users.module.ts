import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AllUsersComponent } from './all-users/all-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../../shared/ui/ui.module';


@NgModule({
  declarations: [AllUsersComponent, AddUserComponent, EmployeeComponent, AddEmployeeComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    UiModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { 
  
}
