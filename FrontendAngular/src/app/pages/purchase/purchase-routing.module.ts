import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddPurchaseBillComponent} from './add-purchase-bill/add-purchase-bill.component';
import {ManagePurchaseBillComponent} from './manage-purchase-bill/manage-purchase-bill.component';
import {PurchaseReturnComponent} from './purchase-return/purchase-return.component';
import {ManagePurchaseReturnComponent} from './manage-purchase-return/manage-purchase-return.component';
import {PurchaseOrderComponent} from './purchase-order/purchase-order.component';
import {ManagePurchaseOrderComponent} from './manage-purchase-order/manage-purchase-order.component';

const routes: Routes = [
 
    { path:'add-purchase-bill', component: AddPurchaseBillComponent},
    { path:'manage-purchase-bill', component: ManagePurchaseBillComponent},
    { path:'purchase-return', component: PurchaseReturnComponent},
    { path:'manage-purchase-return', component:ManagePurchaseReturnComponent },
    { path:'purchase-order', component:PurchaseOrderComponent },
    { path:'manage-purchase-order', component:ManagePurchaseOrderComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
