import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice, SalesItem } from '../SalesItem.model';
import { SharedService } from '../../sales/shared.service';
import { Product } from '../../master/product.model';
@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss']
})
export class PrintInvoiceComponent implements OnInit {
  invoice: Invoice = {
    SalesOrderOfflineId: 0,
    InvoiceNo: "",
    Date: "",
    Contact: "",
    CustomerName: "",
    PaymentMode: "",
    TotalAmount: 0,
    SubTotal: 0,
    Balance: 0,
    AmountPaid: 0,
    Status: "",
    GST: 0,
    SalesItems: [],
  };


  prdname: string;
  arr = [];
  
  
  constructor(private route: ActivatedRoute, public httpClient: HttpClient, public salesservice: SharedService) { }

  ngOnInit(): void {
    
    this.getInvoiceDetails(this.route.snapshot.paramMap.get('id'));
  }
  getInvoiceDetails(id) {
    this.salesservice.getInvoiceById(id).subscribe((data) => {
      this.invoice = data as Invoice;
       
      for (let i = 0; i < Object.keys(this.invoice['SalesItems']).length; i++) {
        
        this.getProductById(this.invoice['SalesItems'][i]['ProductId'], i);
        
      }
      for (let i = 0; i < Object.keys(this.invoice['SalesItems']).length; i++) {
        
        this.arr.push(this.invoice['SalesItems'][i]);
        
      }
      console.log(this.arr);
      

    });


  }

  getProductById(id,index) {

    this.httpClient
      .get("http://127.0.0.1:8000/product/" + id)
      .subscribe((data) => {

        this.invoice['SalesItems'][index]['ProductName'] = data['ProductName'];
       
        
      });
      
      


  }

}
