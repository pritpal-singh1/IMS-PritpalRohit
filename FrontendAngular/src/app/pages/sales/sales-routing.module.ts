import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewInvoiceComponent} from './new-invoice/new-invoice.component';
import { ManageInvoiceComponent} from './manage-invoice/manage-invoice.component';
import { UpdateInvoiceComponent } from './update-invoice/update-invoice.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { ManageSalesReturnComponent } from './manage-sales-return/manage-sales-return.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { UpdateSalesReturnComponent } from './update-sales-return/update-sales-return.component';
import {PrintSalesReturnComponent} from './print-sales-return/print-sales-return.component';;


const routes: Routes = [
 
  { path:'manage-invoice', component: ManageInvoiceComponent},
  { path:'new-invoice', component: NewInvoiceComponent},
  { path: 'invoices/:id', component: UpdateInvoiceComponent },
  { path: 'print-invoice/:id', component: PrintInvoiceComponent },
  // sales Return
  { path:'manage-sales-return', component: ManageSalesReturnComponent},
  { path:'sales-return', component: SalesReturnComponent},
  { path: 'updateSalesReturn/:id', component: UpdateSalesReturnComponent },
  { path: 'print-sales-return/:id', component: PrintSalesReturnComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
