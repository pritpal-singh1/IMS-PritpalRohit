import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SalesRoutingModule} from './sales-routing.module';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { ManageInvoiceComponent } from './manage-invoice/manage-invoice.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [NewInvoiceComponent, ManageInvoiceComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SalesModule { }
