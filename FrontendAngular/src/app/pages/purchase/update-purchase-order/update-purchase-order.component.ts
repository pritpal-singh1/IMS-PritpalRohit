import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {PurchaseService} from '../purchase.service';
import {PurchaseOrder, purchaseOrderItem} from '../purchase.model';
import { HttpClient } from "@angular/common/http";
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import {NavigationEnd, Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-update-purchase-order',
  templateUrl: './update-purchase-order.component.html',
  styleUrls: ['./update-purchase-order.component.scss']
})
export class UpdatePurchaseOrderComponent implements OnInit {

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
   items: purchaseOrderItem[];

  constructor(public purchaseservice: PurchaseService,public httpClient: HttpClient,public datepipe: DatePipe, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBillDetails(this.route.snapshot.paramMap.get('id'));
    this.getProductList();
    this.purchaseitem= new purchaseOrderItem();
    this.getSupplierList();
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
        // this.purchaseOrder.SubTotal += obj.Amount;
        // this.purchaseOrder.GST += Number(obj.GST);
        // this.purchaseOrder.TotalAmount = this.purchaseOrder.SubTotal + this.purchaseOrder.GST
        this.calculate(obj);

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
    else{
      this.showbalance = false;
      this.purchaseOrder.Status = "Paid";
    }
  }
  saveOrder(event) {
    this.purchaseOrder.purchaseItems = this.dataarray;
    // this.purchaseBill.CreatedAt = (new Date()).toString;
    // this.purchaseBill.Date = this.datepipe.transform(this.purchaseBill.Date,'longDate');
    this.purchaseOrder.Date = new Date(this.purchaseOrder.Date);
    console.log(this.purchaseOrder);
    this.purchaseservice.updatePurchaseOrder(this.purchaseOrder).subscribe(data => {
      
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: "New Product "+ this.purchaseOrder.BillNo +" Created",
      showConfirmButton: false,
      timer: 1500
    });
    this.router.navigateByUrl('/', {skipLocationChange: true})
    .then(() => this.router.navigate(['/purchase/manage-purchase-order']));
    
  }
  getBillDetails(id){
    this.purchaseservice.getPurchaseOrderById(id).subscribe(data=>{
      this.purchaseOrder = data as PurchaseOrder;
      this.purchaseOrder.Date = this.datepipe.transform(this.purchaseOrder.Date,'yyyy-MM-dd');
      console.log(this.purchaseOrder);
      this.items = this.purchaseOrder.purchaseItems;
      for (let i = 0; i <Object.keys(this.items).length;i++) {
        this.purchaseitem = new purchaseOrderItem();
        this.purchaseitem.Quantity = this.items[i].Quantity;
        this.purchaseitem.ProductId = this.items[i].ProductId;
        this.purchaseitem.SalePrice = this.items[i].SalePrice;
        this.purchaseitem.GST = this.items[i].GST;
        this.purchaseitem.Amount = this.items[i].Amount;
        this.dataarray.push(this.purchaseitem);
      }
      if(this.purchaseOrder.Balance > 0){
        this.showbalance = true;
      }
    });
  }
  onSubmit(){

  }
}
