import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddPurchaseBillComponent} from './add-purchase-bill/add-purchase-bill.component';
import {ManagePurchaseBillComponent} from './manage-purchase-bill/manage-purchase-bill.component';
import {UpdatePurchaseBillComponent} from './update-purchase-bill/update-purchase-bill.component';
import {PrintPurchaseBillComponent} from './print-purchase-bill/print-purchase-bill.component';
import {PurchaseReturnComponent} from './purchase-return/purchase-return.component';
import {ManagePurchaseReturnComponent} from './manage-purchase-return/manage-purchase-return.component';
import {PurchaseOrderComponent} from './purchase-order/purchase-order.component';
import {ManagePurchaseOrderComponent} from './manage-purchase-order/manage-purchase-order.component';
import {UpdatePurchaseOrderComponent} from './update-purchase-order/update-purchase-order.component';
import {PrintPurchaseOrderComponent} from './print-purchase-order/print-purchase-order.component';
import {UpdatePurchaseReturnComponent} from './update-purchase-return/update-purchase-return.component';
import{PrintPurchaseReturnComponent} from './print-purchase-return/print-purchase-return.component';
import { from } from 'rxjs';

const routes: Routes = [
 
    { path:'add-purchase-bill', component: AddPurchaseBillComponent},
    { path:'manage-purchase-bill', component: ManagePurchaseBillComponent},
    { path:'print-purchase-bill/:id', component: PrintPurchaseBillComponent},
    { path:'update-purchase-bill/:id', component: UpdatePurchaseBillComponent},

    { path:'purchase-return', component: PurchaseReturnComponent},
    { path:'manage-purchase-return', component:ManagePurchaseReturnComponent },
    { path:'print-purchase-return/:id', component: PrintPurchaseReturnComponent},
    { path:'update-purchase-return/:id', component: UpdatePurchaseReturnComponent},
  

    { path:'purchase-order', component:PurchaseOrderComponent },
    { path:'manage-purchase-order', component:ManagePurchaseOrderComponent },
    { path:'print-purchase-order/:id', component: PrintPurchaseOrderComponent},
    { path:'update-purchase-order/:id', component: UpdatePurchaseOrderComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
