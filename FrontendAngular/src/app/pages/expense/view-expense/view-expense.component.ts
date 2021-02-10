import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.scss']
})
export class ViewExpenseComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Expense' }, { label: 'Manage Expense', active: true }];

  }
  addExpense(){
    this.router.navigate(['/expense/add-expense']);
  }

}
