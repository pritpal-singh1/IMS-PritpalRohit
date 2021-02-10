import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllOrdersComponent } from './all-orders/all-orders.component';

import { OnlineordersComponent } from './onlineorders.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';

const routes: Routes = [{ path: 'pending-orders', component: PendingOrdersComponent },
{ path: 'all-orders', component: AllOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineordersRoutingModule { }
