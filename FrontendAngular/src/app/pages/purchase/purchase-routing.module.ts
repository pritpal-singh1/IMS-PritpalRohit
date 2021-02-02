import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddPurchaseBillComponent} from './add-purchase-bill/add-purchase-bill.component';
import {ManagePurchaseBillComponent} from './manage-purchase-bill/manage-purchase-bill.component';


const routes: Routes = [
 
    { path:'add-purchase-bill', component: AddPurchaseBillComponent},
    { path:'manage-purchase-bill', component: ManagePurchaseBillComponent},

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
