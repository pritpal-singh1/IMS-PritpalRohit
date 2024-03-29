import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice, SalesReturn } from './SalesItem.model';



@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://127.0.0.1:8000";
  constructor(private http: HttpClient) { }

  addNewSale(invoice: Invoice) {
    return this.http.post(this.APIUrl + '/newsale/', invoice);
  }
  getInvoiceNo(){
    return this.http.get(this.APIUrl + '/getInvoiceNo/');
  }
  getAllInv(){
  return this.http.get(this.APIUrl + '/newsale/' );
  }

  deleteInv(sid) {
    return this.http.delete(this.APIUrl + '/newsale/' + sid);
  }

  getInvoiceById(id) {
    return this.http.get(this.APIUrl + '/getSalesById/' + id);
  }
  updateInvoice(invoice: Invoice) {
    
    return this.http.put(this.APIUrl + '/newsale/', invoice);
    
  }

  //  Sales Return
  addNewReturn(rtn: SalesReturn){
    return this.http.post(this.APIUrl + '/newSalesReturn/', rtn);
  }
  deleteReturn(rid){
    return this.http.delete(this.APIUrl+'/newSalesReturn/');
  }
  getSalesReturnById(id){
    return this.http.get(this.APIUrl + '/getSalesReturnById/' + id);
  }
  getAllSalesReturn(){
    return this.http.get(this.APIUrl+'/newSalesReturn/');
  }
  getAllInvoices(){
    return this.http.get(this.APIUrl+'/getSalesInvoices/');
  }
  updateSalesReturn(rtn: SalesReturn){
    return this.http.put(this.APIUrl + '/newSalesReturn/', rtn);
  }

    
  }
