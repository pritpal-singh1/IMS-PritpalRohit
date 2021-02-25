import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Expense} from './expense.model';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService{
    formdata:Expense;
    readonly APIUrl = "http://127.0.0.1:8000";

    constructor(private http: HttpClient) { }
    getExpenseList(){
        return this.http.get(this.APIUrl+'/expense/');
    }
    addExpense(formdata: Expense){
        return this.http.post(this.APIUrl + '/expense/',formdata);
    }
    deleteExpense(formdata){
        return this.http.delete(this.APIUrl + '/expense/' + formdata.ExpenseId);
    }
    updateExpense(formdata: Expense){
        return this.http.put(this.APIUrl + '/expense/',formdata);
    }
}