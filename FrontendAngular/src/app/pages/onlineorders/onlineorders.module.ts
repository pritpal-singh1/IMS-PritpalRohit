import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineordersRoutingModule } from './onlineorders-routing.module';
import { OnlineordersComponent } from './onlineorders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';


@NgModule({
  declarations: [OnlineordersComponent, AllOrdersComponent, PendingOrdersComponent],
  imports: [
    CommonModule,
    OnlineordersRoutingModule
  ]
})
export class OnlineordersModule { }
