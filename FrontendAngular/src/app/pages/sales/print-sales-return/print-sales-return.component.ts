import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesReturn,ReturnItem } from '../SalesItem.model';
import { SharedService } from '../../sales/shared.service';

@Component({
  selector: 'app-print-sales-return',
  templateUrl: './print-sales-return.component.html',
  styleUrls: ['./print-sales-return.component.scss']
})
export class PrintSalesReturnComponent implements OnInit {

  SalesReturn: SalesReturn = {
    SalesReturnId:0,
    SalesReturnNo:'',
    InvoiceNo:null,
    Reason:'',
    Contact:'',
    Date:'',
    ClientName:'',  
    PaymentMode:'',
    TotalAmount:0,
    AmountPaid:null,
    Status:'',
    CreatedAt:'',
    Balance:0,
    GST:0,
    SubTotal:0,    
    ReturnItem:[]
  }
  arr = [];

  constructor(private route: ActivatedRoute, public httpClient: HttpClient, public salesservice: SharedService) { }

  ngOnInit(): void {
    this.getInvoiceDetails(this.route.snapshot.paramMap.get('id'));
  }
  getInvoiceDetails(id) {
    this.salesservice.getSalesReturnById(id).subscribe((data) => {
      this.SalesReturn = data as SalesReturn;
       
      for (let i = 0; i < Object.keys(this.SalesReturn['ReturnItem']).length; i++) {
        
        this.getProductById(this.SalesReturn['ReturnItem'][i]['ProductId'], i);
        
      }
      for (let i = 0; i < Object.keys(this.SalesReturn['ReturnItem']).length; i++) {
        
        this.arr.push(this.SalesReturn['ReturnItem'][i]);
        
      }
      console.log(this.arr);
      

    });


  }

  getProductById(id,index) {

    this.httpClient
      .get("http://127.0.0.1:8000/product/" + id)
      .subscribe((data) => {

        this.SalesReturn['ReturnItem'][index]['ProductName'] = data['ProductName'];
       
        
      });
      
      


  }

}
