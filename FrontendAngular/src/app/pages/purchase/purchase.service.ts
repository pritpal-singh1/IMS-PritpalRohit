import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PurchaseBill} from './purchase.model';
@Injectable({
    providedIn: 'root'
  })
  export class PurchaseService{
    readonly APIUrl = "http://127.0.0.1:8000";
    constructor(private http: HttpClient) { }

    getPurchaseInvoiceNo(){
        return this.http.get(this.APIUrl + '/getPurchaseInvoiceNo/');
    }
    addPurchaseBill(bill: PurchaseBill) {
        return this.http.post(this.APIUrl + '/addPurchaseBill/', bill);
    }
  }