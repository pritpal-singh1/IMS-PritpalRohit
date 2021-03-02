import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {ExpenseService} from '../expense.service';
import {Expense} from '../expense.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DataTableDirective } from "angular-datatables";
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';



class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.scss']
})
export class ViewExpenseComponent implements OnInit {

  expenses:any;

  breadCrumbItems: Array<{}>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  readonly APIUrl = "http://127.0.0.1:8000";
  @ViewChild(DataTableDirective, { static: false })
	dtElement: DataTableDirective;
  isDtInitialized: boolean = false;

  constructor(private router:Router, private expenseservice: ExpenseService,private http: HttpClient,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Expense' }, { label: 'Manage Expense', active: true }];
    this.getExpense();

  }
  addExpense(){
    this.expenseservice.formdata = {
      ExpenseId:0,
      Date:'',
      ExpenseType:'',
      Amount:null,
      PaidTo:'',
      PaidBy:'',
      Remarks:''

    }
    this.router.navigate(['/expense/add-expense']);
  }
  getExpense(){
    this.expenseservice.getExpenseList().subscribe( data => {
      
      console.log(data);
      this.expenses = data;
      if (this.isDtInitialized) {
				this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
					dtInstance.destroy();
					this.dtTrigger.next();
				});
			} else {
				this.isDtInitialized = true;
				this.dtTrigger.next();
			}
   });
  }
  editExpense(expense: Expense ){
    expense.Date = this.datepipe.transform(expense.Date,'shortDate');
    this.expenseservice.formdata = Object.assign({},expense);
    this.router.navigate(['expense/add-expense']);
  }
  deleteExpense(expense: Expense){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if(result.value){
        this.expenseservice.deleteExpense(expense).subscribe(data =>{

          this.getExpense();
        });
		Swal.fire(
			"Deleted!",
			"deleted.",
			"success"
		);
      }
    });
  }


}
