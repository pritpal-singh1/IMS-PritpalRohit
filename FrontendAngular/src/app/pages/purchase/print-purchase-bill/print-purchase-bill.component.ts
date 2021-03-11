import { Component, OnInit } from '@angular/core';
import {PurchaseService} from '../purchase.service';
import {PurchaseBill, purchaseItem} from '../purchase.model';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-print-purchase-bill',
  templateUrl: './print-purchase-bill.component.html',
  styleUrls: ['./print-purchase-bill.component.scss']
})
export class PrintPurchaseBillComponent implements OnInit {

  purchaseBill: PurchaseBill={
    PurchaseBillId:0,
    BillNo:'',
    Date:'',
    Supplier:'',
    PurchaseType:'',
    Contact:null,
    SubTotal:null,
    GST:null,
    TotalAmount:null,
    AmountPaid:null,
    Status:'Paid',
    CreatedAt:'',
    Balance:null,
    purchaseItems:[]
   }
   arr = [];
   suppliers;


  constructor(public purchaseservice: PurchaseService,private router: Router,private route: ActivatedRoute,public httpClient: HttpClient,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getBillDetails(this.route.snapshot.paramMap.get('id'));
    this.getSupplierList();
  }
  getBillDetails(id){
    this.purchaseservice.getPurchaseBillById(id).subscribe(data=>{
      this.purchaseBill = data as PurchaseBill;
      this.getSupplierName(this.purchaseBill.Supplier);
      this.purchaseBill.Date = this.datepipe.transform(this.purchaseBill.Date,'mediumDate');

      for (let i = 0; i < Object.keys(this.purchaseBill['purchaseItems']).length; i++) {
        
        this.getProductById(this.purchaseBill['purchaseItems'][i]['ProductId'], i);
        
      }
      for (let i = 0; i < Object.keys(this.purchaseBill['purchaseItems']).length; i++) {
        
        this.arr.push(this.purchaseBill['purchaseItems'][i]);
        
      }
      console.log(this.arr);
      

    });
 
  }
  getProductById(id,index) {

    this.httpClient
      .get("http://127.0.0.1:8000/product/" + id)
      .subscribe((data) => {

        this.purchaseBill['purchaseItems'][index]['ProductName'] = data['ProductName'];
       
        
      });
      
      


  }
  getSupplierName(supplierId){
    var name;
    this.suppliers.forEach(function(supplier){
      // console.log(supplier)
      if(supplier.SupplierId == supplierId){
        console.log(supplier.CompanyName);
        name = supplier.CompanyName;
        // return supplier.Contact;
      }
    });
    this.purchaseBill.Supplier = name;
    // console.log(this.purchaseBill.Contact);
  }
  getSupplierList(){
    this.httpClient.get("http://127.0.0.1:8000/supplier/").subscribe(data=>{
      this.suppliers = data;
      console.log(this.suppliers);
    })
  }

}
