import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import {EmployeesRoutingModule} from './employee-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../../shared/ui/ui.module';
import {HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AddEmployeeComponent, ManageEmployeeComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    EmployeesRoutingModule,
    NgSelectModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class EmployeesModule { }
