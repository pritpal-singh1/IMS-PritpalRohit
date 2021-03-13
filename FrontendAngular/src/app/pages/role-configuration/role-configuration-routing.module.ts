import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddUserComponent} from './add-user/add-user.component';
import {ManageUserComponent} from './manage-user/manage-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
    {path:'add-user', component:AddUserComponent},
    { path: 'manage-user', component: ManageUserComponent },
    { path: 'users/:id', component: UpdateUserComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RoleConfigurationRoutingModule { }