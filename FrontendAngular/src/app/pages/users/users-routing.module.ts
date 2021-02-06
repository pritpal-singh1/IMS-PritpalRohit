import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllUsersComponent} from './all-users/all-users.component';
import {AddUserComponent} from './add-user/add-user.component';
import {EmployeeComponent} from './employee/employee.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import { from } from 'rxjs';

const routes: Routes = [
  {path:'all-users',component:AllUsersComponent},
  {path:'add-users',component:AddUserComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'add-employee',component:AddEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
