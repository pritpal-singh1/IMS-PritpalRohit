import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { ManageSupplierComponent } from './manage-supplier/manage-supplier.component';
import { SupplierComponent } from './supplier.component';
import {SupplierRoutingModule} from './supplier-routing.module';
import { from } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../../../shared/ui/ui.module';
import {DataTablesModule} from 'angular-datatables';



@NgModule({
  declarations: [AddSupplierComponent, ManageSupplierComponent, SupplierComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    DataTablesModule
  ]
})
export class SupplierModule { }
