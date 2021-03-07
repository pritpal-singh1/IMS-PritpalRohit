import { Component, OnInit } from '@angular/core';
import {PurchaseService} from '../purchase.service';
import {PurchaseBill, purchaseItem} from '../purchase.model';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';


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

  constructor(public purchaseservice: PurchaseService,private router: Router,private route: ActivatedRoute,public httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getBillDetails(this.route.snapshot.paramMap.get('id'))
  }
  getBillDetails(id){
    this.purchaseservice.getPurchaseBillById(id).subscribe(data=>{
      this.purchaseBill = data as PurchaseBill;
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

}
