import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  selectValue = [
    {id:1,name:'Cash'},
    {id:2,name:'Cheque'},
    {id:3,name:'Card Payment'},
    {id:4,name:'Wallet'}
   ];
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Expenses' }, { label: 'Add Expense', active: true }];
  }

}
