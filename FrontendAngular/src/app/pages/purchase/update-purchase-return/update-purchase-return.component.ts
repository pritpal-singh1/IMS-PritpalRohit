import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {PurchaseService} from '../purchase.service';
import {PurchaseReturn, PurchaseReturnItem} from '../purchase.model';
import { HttpClient } from "@angular/common/http";
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import {NavigationEnd, Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-purchase-return',
  templateUrl: './update-purchase-return.component.html',
  styleUrls: ['./update-purchase-return.component.scss']
})
export class UpdatePurchaseReturnComponent implements OnInit {

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
   items: PurchaseReturnItem[];


  constructor(public purchaseservice: PurchaseService,public httpClient: HttpClient,public datepipe: DatePipe, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBillDetails(this.route.snapshot.paramMap.get('id'));
    this.getProductList();
    this.purchaseitem= new PurchaseReturnItem();
    this.getSupplierList();
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
        // this.purchaseReturn.SubTotal += obj.Amount;
        // this.purchaseReturn.GST += Number(obj.GST);
        // this.purchaseReturn.TotalAmount = this.purchaseReturn.SubTotal + this.purchaseReturn.GST
        this.calculate(obj);

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
  getBillDetails(id){
    this.purchaseservice.getPurchaseReturnById(id).subscribe(data=>{
      this.purchaseReturn = data as PurchaseReturn;
      this.purchaseReturn.Date = this.datepipe.transform(this.purchaseReturn.Date,'yyyy-MM-dd');
      console.log(this.purchaseReturn);
      this.items = this.purchaseReturn.purchaseItems;
      for (let i = 0; i <Object.keys(this.items).length;i++) {
        this.purchaseitem = new PurchaseReturnItem();
        this.purchaseitem.Quantity = this.items[i].Quantity;
        this.purchaseitem.ProductId = this.items[i].ProductId;
        this.purchaseitem.SalePrice = this.items[i].SalePrice;
        this.purchaseitem.GST = this.items[i].GST;
        this.purchaseitem.Amount = this.items[i].Amount;
        this.dataarray.push(this.purchaseitem);
      }

    });
  }
  onSubmit(){

  }
  saveOrder(event) {
    this.purchaseReturn.purchaseItems = this.dataarray;
    // this.purchaseBill.CreatedAt = (new Date()).toString;
    // this.purchaseBill.Date = this.datepipe.transform(this.purchaseBill.Date,'longDate');
    this.purchaseReturn.Date = new Date(this.purchaseReturn.Date);
    console.log(this.purchaseReturn);
    this.purchaseservice.updatePurchaseReturn(this.purchaseReturn).subscribe(data => {
      
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: "New Product "+ this.purchaseReturn.ReturnBillNo +" Created",
      showConfirmButton: false,
      timer: 1500
    });
    this.router.navigateByUrl('/', {skipLocationChange: true})
    .then(() => this.router.navigate(['/purchase/manage-purchase-return']));
    
  }

}
