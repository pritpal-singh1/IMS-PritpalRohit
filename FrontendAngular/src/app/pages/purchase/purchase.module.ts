import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PurchaseRoutingModule} from './purchase-routing.module';
import { AddPurchaseBillComponent } from './add-purchase-bill/add-purchase-bill.component';
import { ManagePurchaseBillComponent } from './manage-purchase-bill/manage-purchase-bill.component';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';
import { ManagePurchaseReturnComponent } from './manage-purchase-return/manage-purchase-return.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ManagePurchaseOrderComponent } from './manage-purchase-order/manage-purchase-order.component';



@NgModule({
  declarations: [AddPurchaseBillComponent, ManagePurchaseBillComponent, PurchaseReturnComponent, ManagePurchaseReturnComponent, PurchaseOrderComponent, ManagePurchaseOrderComponent],
  imports: [
    CommonModule,
    PurchaseRoutingModule
  ]
})
export class PurchaseModule { }
