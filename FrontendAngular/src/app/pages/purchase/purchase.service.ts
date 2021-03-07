import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PurchaseBill, PurchaseOrder} from './purchase.model';
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
    getAllBills(){
      return this.http.get(this.APIUrl+'/addPurchaseBill/');
    }
    deleteBill(bid){
      return this.http.delete(this.APIUrl + '/addPurchaseBill/' + bid);
    }
    updatePurchaseBill(bill: PurchaseBill){
      return this.http.put(this.APIUrl+'/addPurchaseBill/',bill);
    }
    getPurchaseBillById(id){
      return this.http.get(this.APIUrl+'/getPurchaseBillById/'+id);
    }

    // Purchase Order
    getPurchaseOrderNo(){
      return this.http.get(this.APIUrl + '/getPurchaseOrderNo/');
    }
    getAllOrders(){
      return this.http.get(this.APIUrl+'/addPurchaseOrder/');
    }
    addPurchaseOrder(order: PurchaseOrder) {
      return this.http.post(this.APIUrl + '/addPurchaseOrder/', order);
    }
    deleteOrder(oid){
      return this.http.delete(this.APIUrl + '/addPurchaseOrder/' + oid);
    }
    updatePurchaseOrder(order: PurchaseOrder){
      return this.http.put(this.APIUrl+'/addPurchaseOrder/',order);
    }
    getPurchaseOrderById(id){
      return this.http.get(this.APIUrl+'/getPurchaseOrderById/'+id);
    }
  }