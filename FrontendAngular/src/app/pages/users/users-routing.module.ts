import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllUsersComponent} from './all-users/all-users.component';
import {AddUserComponent} from './add-user/add-user.component';

const routes: Routes = [
  {path:'all-users',component:AllUsersComponent},
  {path:'add-users',component:AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
