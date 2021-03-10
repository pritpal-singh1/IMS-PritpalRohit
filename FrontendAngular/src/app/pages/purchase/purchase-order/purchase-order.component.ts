import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {PurchaseService} from '../purchase.service';
import {PurchaseOrder, purchaseOrderItem} from '../purchase.model';
import { HttpClient } from "@angular/common/http";
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  showbalance: boolean = false;
  selectValue = [
    {id:1,name:'Cash'},
    {id:2,name:'Cheque'},
    {id:3,name:'Card Payment'},
    // {id:4,name:'Wallet'}
   ];
   suppliers:any;
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
   dataarray = [];
   purchaseitem = new purchaseOrderItem();
   AllProductList: any;
   stockQuantity;
   purchaseprice;
   MRP;
   ProductData: any[];
   isShow: boolean = false;
 

  constructor(public purchaseservice: PurchaseService,public httpClient: HttpClient,public datepipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Purchase' }, { label: 'Purchase Order', active: true }];
    this.purchaseitem = new purchaseOrderItem();
    this.dataarray.push(this.purchaseitem);
    // this.getInvoice();
    this.getSupplierList();
    this.getProductList();
  }
  getInvoice(){
    this.purchaseservice.getPurchaseOrderNo().subscribe((data)=>{
      console.log(data);
      this.purchaseOrder.BillNo = "INV-00"+ (Number(data)+1);
    })
  }
  getSupplierContact(supplierId){
    var contact;
    this.suppliers.forEach(function(supplier){
      // console.log(supplier)
      if(supplier.SupplierId == supplierId){
        console.log(supplier.Contact);
        contact = supplier.Contact;
        // return supplier.Contact;
      }
    });
    this.purchaseOrder.Contact = contact;
    console.log(this.purchaseOrder.Contact);
  }
  getSupplierList(){
    this.httpClient.get("http://127.0.0.1:8000/supplier/").subscribe(data=>{
      this.suppliers = data;
      console.log(this.suppliers);
    })
  }
  addItem(){
    this.isShow = false;
    this.purchaseitem = new purchaseOrderItem();
    this.dataarray.push(this.purchaseitem);
  }
  getProductList() {
    this.httpClient.get("http://127.0.0.1:8000/product/").subscribe((data) => {
      this.AllProductList = data as any;
      console.log(this.AllProductList);
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
        this.purchaseOrder.SubTotal += obj.Amount;
        this.purchaseOrder.GST += Number(obj.GST);
        this.purchaseOrder.TotalAmount = this.purchaseOrder.SubTotal + this.purchaseOrder.GST
      });
      this.isShow = true;
  }
  removeItem(index){
    this.purchaseOrder.SubTotal -= this.dataarray[index].Amount;
    this.purchaseOrder.GST -= this.dataarray[index].GST;
    this.purchaseOrder.TotalAmount = this.purchaseOrder.SubTotal + this.purchaseOrder.GST;
    this.dataarray.splice(index,1);
  }
  calculate(obj){
    this.purchaseOrder.SubTotal -= obj.Amount;
    this.purchaseOrder.GST -= Number(obj.GST);
    obj.Amount = obj.SalePrice * obj.Quantity;
    obj.GST = obj.GST * obj.Quantity;
    this.purchaseOrder.SubTotal += obj.Amount;
    this.purchaseOrder.GST += obj.GST;
    this.purchaseOrder.TotalAmount = this.purchaseOrder.GST + this.purchaseOrder.SubTotal; 
  }
  getbal() {
    this.purchaseOrder.Balance = this.purchaseOrder.TotalAmount - this.purchaseOrder.AmountPaid;
    if (this.purchaseOrder.Balance != 0)
    {
      this.showbalance = true;
      this.purchaseOrder.Status = "Unpaid";
    }
  }
  saveOrderWithoutPrint(event) {
    this.purchaseOrder.purchaseItems = this.dataarray;
    // this.purchaseBill.CreatedAt = (new Date()).toString;
    // this.purchaseBill.Date = this.datepipe.transform(this.purchaseBill.Date,'longDate');
    this.purchaseOrder.Date = new Date(this.purchaseOrder.Date);
    console.log(this.purchaseOrder);
    this.purchaseservice.addPurchaseOrder(this.purchaseOrder).subscribe(data => {
      
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: "New Product "+ this.purchaseOrder.BillNo +" Created",
      showConfirmButton: false,
      timer: 1500
    });
    
  }
  saveOrderWithPrint(event){
    this.purchaseOrder.purchaseItems = this.dataarray;
    this.purchaseOrder.Date = new Date(this.purchaseOrder.Date);
    this.purchaseservice.addPurchaseOrder(this.purchaseOrder).subscribe(data => {
      this.router.navigate(['/purchase/print-purchase-order/'+data['PurchaseId']]);
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: "New Product "+ this.purchaseOrder.BillNo +" Created",
      showConfirmButton: false,
      timer: 1500
    });
    event.preventDefault();
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/purchase/purchase-order']));
  }
  onSubmit(){
    
  }
}
