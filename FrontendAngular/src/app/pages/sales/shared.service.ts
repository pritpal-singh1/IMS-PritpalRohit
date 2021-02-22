import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from './SalesItem.model';


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

    
  }
