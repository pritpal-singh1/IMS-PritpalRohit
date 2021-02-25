import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SalesRoutingModule} from './sales-routing.module';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { ManageInvoiceComponent } from './manage-invoice/manage-invoice.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../../shared/ui/ui.module';
import { UpdateInvoiceComponent } from './update-invoice/update-invoice.component';




@NgModule({
  declarations: [NewInvoiceComponent, ManageInvoiceComponent, UpdateInvoiceComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule
  ]
})
export class SalesModule { }
