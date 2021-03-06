import { Component, OnInit } from '@angular/core';
import {PurchaseService} from '../purchase.service';
import {PurchaseBill, purchaseItem} from '../purchase.model';
import { HttpClient } from "@angular/common/http";
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-purchase-bill',
  templateUrl: './update-purchase-bill.component.html',
  styleUrls: ['./update-purchase-bill.component.scss']
})
export class UpdatePurchaseBillComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  showbalance: boolean = false;
  selectValue = [
    {id:1,name:'Cash'},
    {id:2,name:'Cheque'},
    {id:3,name:'Card Payment'},
    {id:4,name:'Wallet'}
   ];
   suppliers:any;
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
   dataarray = [];
   purchaseitem= new purchaseItem();
   items: purchaseItem[];
   AllProductList: any;
   stockQuantity;
   purchaseprice;
   MRP;
   ProductData: any[];
   isShow: boolean = false;
 
  constructor(public purchaseservice: PurchaseService,public httpClient: HttpClient,public datepipe: DatePipe,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBillDetails(this.route.snapshot.paramMap.get('id'));
    this.getProductList();
    this.purchaseitem= new purchaseItem();
    this.getSupplierList();

  }
  getSupplierList(){
    this.httpClient.get("http://127.0.0.1:8000/supplier/").subscribe(data=>{
      this.suppliers = data;
      console.log(this.suppliers);
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
    this.purchaseBill.Contact = contact;
    console.log(this.purchaseBill.Contact);
  }
  addItem(){
    this.isShow = false;
    this.purchaseitem = new purchaseItem();
    this.dataarray.push(this.purchaseitem);
  }
  // getInvoice(){
  //   this.purchaseservice.getPurchaseInvoiceNo().subscribe((data)=>{
  //     console.log(data);
  //     this.purchaseBill.BillNo = "INV-00"+ (Number(data)+1);
  //   })
  // }

  getBillDetails(id){
    this.purchaseservice.getPurchaseBillById(id).subscribe(data=>{
      this.purchaseBill = data as PurchaseBill;
      this.purchaseBill.Date = this.datepipe.transform(this.purchaseBill.Date,'yyyy-MM-dd');
      console.log(this.purchaseBill);
      this.items = this.purchaseBill.purchaseItems;
      for (let i = 0; i <Object.keys(this.items).length;i++) {
        this.purchaseitem = new purchaseItem();
        this.purchaseitem.Quantity = this.items[i].Quantity;
        this.purchaseitem.ProductId = this.items[i].ProductId;
        this.purchaseitem.SalePrice = this.items[i].SalePrice;
        this.purchaseitem.GST = this.items[i].GST;
        this.purchaseitem.Amount = this.items[i].Amount;
        this.dataarray.push(this.purchaseitem);
      }

    });
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
        // this.purchaseBill.SubTotal += obj.Amount;
        // this.purchaseBill.GST += Number(obj.GST);
        // this.purchaseBill.TotalAmount = this.purchaseBill.SubTotal + this.purchaseBill.GST
        this.calculate(obj);

      });
      this.isShow = true;
  }
  removeItem(index){
    this.purchaseBill.SubTotal -= this.dataarray[index].Amount;
    this.purchaseBill.GST -= this.dataarray[index].GST;
    this.purchaseBill.TotalAmount = this.purchaseBill.SubTotal + this.purchaseBill.GST;
    this.dataarray.splice(index,1);
  }
  calculate(obj){
    this.purchaseBill.SubTotal -= obj.Amount;
    this.purchaseBill.GST -= Number(obj.GST);
    obj.Amount = obj.SalePrice * obj.Quantity;
    obj.GST = obj.GST * obj.Quantity;
    this.purchaseBill.SubTotal += obj.Amount;
    this.purchaseBill.GST += obj.GST;
    this.purchaseBill.TotalAmount = this.purchaseBill.GST + this.purchaseBill.SubTotal; 
  }
  getbal() {
    this.purchaseBill.Balance = this.purchaseBill.TotalAmount - this.purchaseBill.AmountPaid;
    if (this.purchaseBill.Balance != 0)
    {
      this.showbalance = true;
      this.purchaseBill.Status = "Unpaid";
    }
  }
  saveBill(event){
    this.purchaseBill.purchaseItems = this.dataarray;
    // this.purchaseBill.CreatedAt = (new Date()).toString;
    // this.purchaseBill.Date = this.datepipe.transform(this.purchaseBill.Date,'longDate');
    this.purchaseBill.Date = new Date(this.purchaseBill.Date);
    console.log(this.purchaseBill);
    this.purchaseservice.updatePurchaseBill(this.purchaseBill).subscribe(data => {
      
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: "New Product "+ this.purchaseBill.BillNo +" Created",
      showConfirmButton: false,
      timer: 1500
    });
    this.router.navigateByUrl('/', {skipLocationChange: true})
    .then(() => this.router.navigate(['/purchase/manage-purchase-bill']));
  }
}
