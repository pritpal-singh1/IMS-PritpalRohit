import { Component, OnInit } from '@angular/core';
import {PurchaseOrder, purchaseOrderItem} from '../purchase.model';
import {PurchaseService} from '../purchase.service';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-print-purchase-order',
  templateUrl: './print-purchase-order.component.html',
  styleUrls: ['./print-purchase-order.component.scss']
})
export class PrintPurchaseOrderComponent implements OnInit {

  purchaseOrder: PurchaseOrder={
    PurchaseOrderId:0,
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
  constructor(public purchaseservice: PurchaseService,private router: Router,private route: ActivatedRoute,public httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getBillDetails(this.route.snapshot.paramMap.get('id'));
    this.getSupplierList();
  }
  getBillDetails(id){
    this.purchaseservice.getPurchaseOrderById(id).subscribe(data=>{
      this.purchaseOrder = data as PurchaseOrder;
      this.getSupplierName(this.purchaseOrder.Supplier);
      for (let i = 0; i < Object.keys(this.purchaseOrder['purchaseItems']).length; i++) {
        
        this.getProductById(this.purchaseOrder['purchaseItems'][i]['ProductId'], i);
        
      }
      for (let i = 0; i < Object.keys(this.purchaseOrder['purchaseItems']).length; i++) {
        
        this.arr.push(this.purchaseOrder['purchaseItems'][i]);
        
      }
      console.log(this.arr);
      

    });
 
  }
  getProductById(id,index) {

    this.httpClient
      .get("http://127.0.0.1:8000/product/" + id)
      .subscribe((data) => {

        this.purchaseOrder['purchaseItems'][index]['ProductName'] = data['ProductName'];
       
        
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
    this.purchaseOrder.Supplier = name;
    // console.log(this.purchaseBill.Contact);
  }
  getSupplierList(){
    this.httpClient.get("http://127.0.0.1:8000/supplier/").subscribe(data=>{
      this.suppliers = data;
      console.log(this.suppliers);
    })
  }

}
