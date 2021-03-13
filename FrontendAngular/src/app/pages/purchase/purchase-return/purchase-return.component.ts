import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {PurchaseService} from '../purchase.service';
import {PurchaseReturn, PurchaseReturnItem, PurchaseBill, purchaseItem} from '../purchase.model';
import { HttpClient } from "@angular/common/http";
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';


@Component({
  selector: 'app-purchase-return',
  templateUrl: './purchase-return.component.html',
  styleUrls: ['./purchase-return.component.scss']
})
export class PurchaseReturnComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  selectValue = [
    {id:1,name:'Cash'},
    {id:2,name:'Cheque'},
    {id:3,name:'Card Payment'},
    // {id:4,name:'Wallet'}
   ];
   showbalance: boolean = false;
   suppliers:any;
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
   dataarray = [];
   purchaseitem = new PurchaseReturnItem();
   AllProductList: any;
   stockQuantity;
   purchaseprice;
   MRP;
   ProductData: any[];
   isShow: boolean = false;
   bills:PurchaseBill[];
   billNumbers = [];
   purchaseItems = [];

  constructor(public purchaseservice: PurchaseService,public httpClient: HttpClient,public datepipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Purchase' }, { label: 'Purchase Return', active: true }];
    this.purchaseitem = new PurchaseReturnItem();
    this.dataarray.push(this.purchaseitem);
    // this.getInvoice();
    this.getPurchaseBillNumbers();
    this.getSupplierList();
    this.getProductList();
  }
  getInvoice(){
    this.purchaseservice.getPurchaseReturnNumber().subscribe((data)=>{
      console.log(data);
      this.purchaseReturn.ReturnBillNo = "INV-00"+ (Number(data)+1);
    })
  }
  getPurchaseBillNumbers(){
    this.purchaseservice.getAllBills().subscribe((data)=>{
      this.bills = data as PurchaseBill[];
      // console.log(this.bills);
      this.bills.forEach(element => {
        this.billNumbers.push(element.BillNo);
        // console.log(element.BillNo);
      });
      console.log(this.billNumbers);
    });
  }
  getSupplierList(){
    this.httpClient.get("http://127.0.0.1:8000/supplier/").subscribe(data=>{
      this.suppliers = data;
      console.log(this.suppliers);
    })
  }
  addItem(){
    this.isShow = false;
    this.purchaseitem = new PurchaseReturnItem();
    this.dataarray.push(this.purchaseitem);
  }
  getProductList() {
    this.httpClient.get("http://127.0.0.1:8000/product/").subscribe((data) => {
      this.AllProductList = data as any;
      console.log(this.AllProductList);
    });
  }
  getPurchaseBillByBillno(bilNo){
    this.httpClient.get("http://127.0.0.1:8000/getPurchaseBillByBillno/" + bilNo).subscribe((data) => {
      // console.log(data['purchaseItems']);
      this.purchaseItems = data['purchaseItems'];
      this.purchaseItems.forEach(element => {
        console.log(element.ProductId);
        this.getProduct(element.ProductId);
      });
      // console.log(this.purchaseItems);
    });
    // console.log(this.purchaseItems);
    
  }
  getProduct(id) {

    this.httpClient
      .get("http://127.0.0.1:8000/product/" + id)
      .subscribe((data) => {

        // this.purchaseBill['purchaseItems'][index]['ProductName'] = data['ProductName'];
       this.AllProductList.push(data);
        
      });
  }
  
  getProductById(obj) {
    
    this.httpClient 
      .get("http://127.0.0.1:8000/product/" + obj["ProductId"])
      .subscribe((data) => {
        this.ProductData = data as any;
        this.stockQuantity=this.ProductData["StockQTY"]
        this.purchaseprice=this.ProductData["PurchasePrice"]
        this.MRP=this.ProductData["MRP"]

        obj.SalePrice = this.ProductData["SalePrice"];
        obj.Quantity = 1;
         //calcultae the amount when used select one product on the basis of the unit price
         obj.Amount = obj.SalePrice * obj.Quantity;
         //calcultae the GST when used select one product on the basis of the unit price
        obj.GST = this.ProductData["GST"];
        //here we iterate a loop which will calculate the sub total as soon as user selects a product from 
        //the list
        this.purchaseReturn.SubTotal += obj.Amount;
        this.purchaseReturn.GST += Number(obj.GST);
        this.purchaseReturn.TotalAmount = this.purchaseReturn.SubTotal + this.purchaseReturn.GST
      });
      this.isShow = true;
  }
  removeItem(index){
    this.purchaseReturn.SubTotal -= this.dataarray[index].Amount;
    this.purchaseReturn.GST -= this.dataarray[index].GST;
    this.purchaseReturn.TotalAmount = this.purchaseReturn.SubTotal + this.purchaseReturn.GST;
    this.dataarray.splice(index,1);
  }
  calculate(obj){
    this.purchaseReturn.SubTotal -= obj.Amount;
    this.purchaseReturn.GST -= Number(obj.GST);
    obj.Amount = obj.SalePrice * obj.Quantity;
    obj.GST = obj.GST * obj.Quantity;
    this.purchaseReturn.SubTotal += obj.Amount;
    this.purchaseReturn.GST += obj.GST;
    this.purchaseReturn.TotalAmount = this.purchaseReturn.GST + this.purchaseReturn.SubTotal; 
  }
  getbal() {
    this.purchaseReturn.Balance = this.purchaseReturn.TotalAmount - this.purchaseReturn.AmountPaid;
    if (this.purchaseReturn.Balance != 0)
    {
      this.showbalance = true;
      this.purchaseReturn.Status = "Unpaid";
    }
    else{
      this.showbalance = false;
      this.purchaseReturn.Status = "Paid";
    }
  }
  saveReturnWithoutPrint(event){
    this.purchaseReturn.purchaseItems = this.dataarray;
    this.purchaseReturn.Date = new Date(this.purchaseReturn.Date);
    this.purchaseservice.addPurchaseReturn(this.purchaseReturn).subscribe(data => {
      
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: "New Product "+ this.purchaseReturn.ReturnBillNo +" Created",
      showConfirmButton: false,
      timer: 1500
    });
  }
  onSubmit(){
    
  }
}
