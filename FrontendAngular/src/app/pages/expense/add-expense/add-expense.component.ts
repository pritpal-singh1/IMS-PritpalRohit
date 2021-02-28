import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ExpenseService} from '../expense.service';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
  constructor(public expenseservice: ExpenseService, private router: Router,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Expenses' }, { label: 'Add Expense', active: true }];
    if(!this.expenseservice.formdata){
      this.restForm();
    }
  }
  restForm(form? : NgForm){
    if(form != null)
      form.resetForm();
      this.expenseservice.formdata = {
        ExpenseId:0,
        Date:'',
        ExpenseType:'',
        Amount:null,
        PaidTo:'',
        PaidBy:'',
        Remarks:''

      }
  }
  onSubmit(form: NgForm){
    form.value.Date = new Date(form.value.Date);
    if(form.value.ExpenseId == 0){
      this.insertRecord(form);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Expense Added',
        showConfirmButton: false,
        timer: 1500
      });
      this.expenseservice.formdata = {
        ExpenseId:0,
        Date:'',
        ExpenseType:'',
        Amount:null,
        PaidTo:'',
        PaidBy:'',
        Remarks:''

      }
      this.router.navigate(['/expense/manage-expense']);
    }
    
    else{
      this.updateRecord(form);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '  Updated',
        showConfirmButton: false,
        timer: 1500
      });
      this.expenseservice.formdata = {
        ExpenseId:0,
        Date:'',
        ExpenseType:'',
        Amount:null,
        PaidTo:'',
        PaidBy:'',
        Remarks:''

      }
      this.router.navigate(['/expense/manage-expense']);
    }
  }
  insertRecord(form: NgForm){
    this.expenseservice.addExpense(form.value).subscribe(res => {
      this.expenseservice.getExpenseList();
    });
  }
  updateRecord(form: NgForm){
    this.expenseservice.updateExpense(form.value).subscribe(res =>{ });
  }

}
