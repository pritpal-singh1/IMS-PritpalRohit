import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InventoryRoutingModule} from './inventory-routing.module';
import { LowLevelStockComponent } from './low-level-stock/low-level-stock.component';
import { StockAvailabilityComponent } from './stock-availability/stock-availability.component';
import { StockAdjustmentsComponent } from './stock-adjustments/stock-adjustments.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../../shared/ui/ui.module';


@NgModule({
  declarations: [LowLevelStockComponent, StockAvailabilityComponent, StockAdjustmentsComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class InventoryModule { }
