import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {ManageEmployeeComponent} from './manage-employee/manage-employee.component';

const routes: Routes = [
    {path:'add-employee', component:AddEmployeeComponent},
    {path:'manage-employee', component:ManageEmployeeComponent}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EmployeesRoutingModule { }