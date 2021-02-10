import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import {RoleConfigurationRoutingModule} from './role-configuration-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../../shared/ui/ui.module';


@NgModule({
  declarations: [AddUserComponent, ManageUserComponent],
  imports: [
    CommonModule,
    RoleConfigurationRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule
  ]
})
export class RoleConfigurationModule { }
