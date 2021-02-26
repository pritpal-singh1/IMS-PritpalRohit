import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewInvoiceComponent} from './new-invoice/new-invoice.component';
import { ManageInvoiceComponent} from './manage-invoice/manage-invoice.component';
import { UpdateInvoiceComponent } from './update-invoice/update-invoice.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';


const routes: Routes = [
 
  { path:'manage-invoice', component: ManageInvoiceComponent},
  { path:'new-invoice', component: NewInvoiceComponent},
  { path: 'invoices/:id', component: UpdateInvoiceComponent },
  { path: 'print-invoice/:id', component: PrintInvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
