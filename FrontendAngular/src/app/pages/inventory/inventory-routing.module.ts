import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import {LowLevelStockComponent} from './low-level-stock/low-level-stock.component';
import {StockAdjustmentsComponent} from './stock-adjustments/stock-adjustments.component';
import {StockAvailabilityComponent} from './stock-availability/stock-availability.component';

const routes: Routes = [

    {path:'stock-availability',component:StockAvailabilityComponent},
    {path:'stock-adjustments', component:StockAdjustmentsComponent},
    {path:'low-level-stock', component:LowLevelStockComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InventoryRoutingModule { }
  