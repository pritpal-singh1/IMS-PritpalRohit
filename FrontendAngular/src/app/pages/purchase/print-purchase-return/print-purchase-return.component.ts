import { Component, OnInit } from '@angular/core';
import {PurchaseService} from '../purchase.service';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import {PurchaseReturn, PurchaseReturnItem} from '../purchase.model';

@Component({
  selector: 'app-print-purchase-return',
  templateUrl: './print-purchase-return.component.html',
  styleUrls: ['./print-purchase-return.component.scss']
})
export class PrintPurchaseReturnComponent implements OnInit {

  purchaseReturn: PurchaseReturn={
    PurchaseReturnId:0,
    ReturnBillNo:'',
    PurchaseBillNo:'',
    Date:'',
    Supplier:'',
    ReturnType:'',
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


  constructor(public purchaseservice: PurchaseService,private router: Router,private route: ActivatedRoute,public httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getorderDetails(this.route.snapshot.paramMap.get('id'));
    this.getSupplierList();

  }
  getorderDetails(id){
    this.purchaseservice.getPurchaseReturnById(id).subscribe(data=>{
      this.purchaseReturn = data as PurchaseReturn;
      this.getSupplierName(this.purchaseReturn.Supplier);
      for (let i = 0; i < Object.keys(this.purchaseReturn['purchaseItems']).length; i++) {
        
        this.getProductById(this.purchaseReturn['purchaseItems'][i]['ProductId'], i);
        
      }
      for (let i = 0; i < Object.keys(this.purchaseReturn['purchaseItems']).length; i++) {
        
        this.arr.push(this.purchaseReturn['purchaseItems'][i]);
        
      }
      console.log(this.arr);
      

    });
 
  }
  getProductById(id,index) {

    this.httpClient
      .get("http://127.0.0.1:8000/product/" + id)
      .subscribe((data) => {

        this.purchaseReturn['purchaseItems'][index]['ProductName'] = data['ProductName'];
       
        
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
    this.purchaseReturn.Supplier = name;
    // console.log(this.purchaseBill.Contact);
  }
  getSupplierList(){
    this.httpClient.get("http://127.0.0.1:8000/supplier/").subscribe(data=>{
      this.suppliers = data;
      console.log(this.suppliers);
    })
  }
}
