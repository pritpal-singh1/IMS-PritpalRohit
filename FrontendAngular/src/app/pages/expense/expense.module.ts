import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseComponent } from './expense.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ViewExpenseComponent } from './view-expense/view-expense.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../../shared/ui/ui.module';


@NgModule({
  declarations: [ExpenseComponent, AddExpenseComponent, ViewExpenseComponent],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule
  ]
})
export class ExpenseModule { }
