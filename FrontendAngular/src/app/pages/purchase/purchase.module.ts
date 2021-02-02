import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PurchaseRoutingModule} from './purchase-routing.module';
import { AddPurchaseBillComponent } from './add-purchase-bill/add-purchase-bill.component';
import { ManagePurchaseBillComponent } from './manage-purchase-bill/manage-purchase-bill.component';



@NgModule({
  declarations: [AddPurchaseBillComponent, ManagePurchaseBillComponent],
  imports: [
    CommonModule,
    PurchaseRoutingModule
  ]
})
export class PurchaseModule { }
