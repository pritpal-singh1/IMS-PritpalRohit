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
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { ManageSalesReturnComponent } from './manage-sales-return/manage-sales-return.component';
import { UpdateSalesReturnComponent } from './update-sales-return/update-sales-return.component';




@NgModule({
  declarations: [NewInvoiceComponent, ManageInvoiceComponent, UpdateInvoiceComponent, PrintInvoiceComponent, SalesReturnComponent, ManageSalesReturnComponent, UpdateSalesReturnComponent],
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
