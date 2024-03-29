import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PurchaseRoutingModule} from './purchase-routing.module';
import { AddPurchaseBillComponent } from './add-purchase-bill/add-purchase-bill.component';
import { ManagePurchaseBillComponent } from './manage-purchase-bill/manage-purchase-bill.component';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';
import { ManagePurchaseReturnComponent } from './manage-purchase-return/manage-purchase-return.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ManagePurchaseOrderComponent } from './manage-purchase-order/manage-purchase-order.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../../shared/ui/ui.module';
import { DataTablesModule } from 'angular-datatables';
import { UpdatePurchaseBillComponent } from './update-purchase-bill/update-purchase-bill.component';
import { PrintPurchaseBillComponent } from './print-purchase-bill/print-purchase-bill.component';
import { UpdatePurchaseOrderComponent } from './update-purchase-order/update-purchase-order.component';
import { PrintPurchaseOrderComponent } from './print-purchase-order/print-purchase-order.component';
import { UpdatePurchaseReturnComponent } from './update-purchase-return/update-purchase-return.component';
import { PrintPurchaseReturnComponent } from './print-purchase-return/print-purchase-return.component';


@NgModule({
  declarations: [AddPurchaseBillComponent, ManagePurchaseBillComponent, PurchaseReturnComponent, ManagePurchaseReturnComponent, PurchaseOrderComponent, ManagePurchaseOrderComponent, UpdatePurchaseBillComponent, PrintPurchaseBillComponent, UpdatePurchaseOrderComponent, PrintPurchaseOrderComponent, UpdatePurchaseReturnComponent, PrintPurchaseReturnComponent],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    DataTablesModule
  ]
})
export class PurchaseModule { }
