import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import {RoleConfigurationRoutingModule} from './role-configuration-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../../shared/ui/ui.module';
import { DataTablesModule } from 'angular-datatables';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [AddUserComponent, ManageUserComponent, UpdateUserComponent],
  imports: [
    CommonModule,
    RoleConfigurationRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    DataTablesModule
    
  ]
})
export class RoleConfigurationModule { }
