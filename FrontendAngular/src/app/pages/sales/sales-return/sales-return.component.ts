import { Component, OnInit } from '@angular/core';
import {SalesReturn,ReturnItem} from '../SalesItem.model';
import { SharedService } from "../../sales/shared.service";
import Swal from 'sweetalert2';
import {NavigationEnd, Router} from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-sales-return',
  templateUrl: './sales-return.component.html',
  styleUrls: ['./sales-return.component.scss']
})
export class SalesReturnComponent implements OnInit {

  isShow: boolean = false;
  showbalance: boolean = false;
  stockQuantity;
  purchaseprice;
  MRP;
  invNo;
  breadCrumbItems: Array<{}>;
  paymentMode = [
    { id: 1, name: "Cash" },
    { id: 2, name: "Cheque" },
    { id: 2, name: "Card Payment" },
    // { id: 2, name: "Wallet" },
 
  ];

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
  ProductData: any[];
  AllProductList: any;
  dataarray = [];
  ReturnItem = new ReturnItem();
  invoices:any;
  
  constructor(public httpClient: HttpClient, private router: Router,public salesservice: SharedService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.ReturnItem = new ReturnItem();
    this.SalesReturn.GST = this.SalesReturn.TotalAmount = this.SalesReturn.SubTotal = 0;
    this.SalesReturn.Date = new Date();
    this.SalesReturn.Date  = this.datepipe.transform(this.SalesReturn.Date, 'yyyy-MM-dd');
    this.breadCrumbItems = [
      { label: "Sales" },
      { label: "Add Sales Return", active: true },
    ];
    this.dataarray.push(this.ReturnItem);
    this.getProductList();
    this.getAllInvoices();

  }
  getAllInvoices(){
    this.salesservice.getAllInvoices().subscribe((data)=>{
      console.log(data);
      this.invoices = data as any;
      console.log(this.invoices);
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
        console.log(this.ProductData["StockQTY"]);

        //sets the sale price for each products
        obj.SalePrice = this.ProductData["SalePrice"];
        obj.Quantity = 1;

        //calcultae the amount when used select one product on the basis of the unit price
        obj.Amount = obj.SalePrice * obj.Quantity;
        //calcultae the GST when used select one product on the basis of the unit price
        obj.GST = this.ProductData["GST"];
        //here we iterate a loop which will calculate the sub total as soon as user selects a product from 
        //the list
        var i;
        this.SalesReturn.SubTotal = 0;
        for (i = 0; i < this.dataarray.length; i++) {
          console.log("This Dataraay " + this.dataarray);
          console.log("This Amount " + this.dataarray[i].Amount);
          this.SalesReturn.SubTotal =
            this.SalesReturn.SubTotal + this.dataarray[i].Amount;
        }
        // this.SalesReturn.SubTotal += obj.Amount;
        
        //similarly here we iterate a loop which will calculate the GST as soon as user selects a product from 
        //the list
      
        this.SalesReturn.GST = 0;
        for (i = 0; i < this.dataarray.length; i++) {
          console.log("This Dataraay " + this.dataarray);
          console.log("This Amount " +  typeof this.dataarray[i].GST);
          this.SalesReturn.GST =
            this.SalesReturn.GST + parseInt(this.dataarray[i].GST);
        }
        // this.SalesReturn.GST += Number(obj.GST);
        this.SalesReturn.TotalAmount = this.SalesReturn.GST + this.SalesReturn.SubTotal; 
        
        // console.log(this.ProductData);
      });
    
        this.isShow = true;
      
  }
  getProductList() {
    this.httpClient.get("http://127.0.0.1:8000/product/").subscribe((data) => {
      this.AllProductList = data as any;
      console.log(this.AllProductList);
    });
  } 
  addItem() {
    this.isShow = false;
    this.SalesReturn = new SalesReturn();
    this.dataarray.push(this.SalesReturn);
  }
  onSubmit(){

  }
  removeItem(index){
    this.SalesReturn.SubTotal -= this.dataarray[index].Amount;
    this.SalesReturn.GST -= this.dataarray[index].GST;
    this.SalesReturn.TotalAmount = this.SalesReturn.SubTotal + this.SalesReturn.GST;
    this.dataarray.splice(index,1);
  }
  calculate(obj){
    this.SalesReturn.SubTotal -= obj.Amount;
    this.SalesReturn.GST -= Number(obj.GST);
    obj.Amount = obj.SalePrice * obj.Quantity;
    obj.GST = obj.GST * obj.Quantity;
    this.SalesReturn.SubTotal += obj.Amount;
    this.SalesReturn.GST += obj.GST;
    this.SalesReturn.TotalAmount = this.SalesReturn.GST + this.SalesReturn.SubTotal; 
  }
  getbal() {
    this.SalesReturn.Balance = this.SalesReturn.TotalAmount - this.SalesReturn.AmountPaid;
    if (this.SalesReturn.Balance != 0)
    {
      this.showbalance = true;
      this.SalesReturn.Status = "Unpaid";
    }
    else{
      this.showbalance = false;
      this.SalesReturn.Status = "Paid";
    }
  }
  saveInvoiceWithoutPrint(event){
    this.SalesReturn.ReturnItem = this.dataarray;
    this.SalesReturn.Date = new Date(this.SalesReturn.Date);
    this.salesservice.addNewReturn(this.SalesReturn).subscribe((data)=>{

    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: "New Product "+ this.SalesReturn.SalesReturnNo +" Created",
      showConfirmButton: false,
      timer: 1500
    });
    event.preventDefault();

    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/sales/sales-return']));
  }
  saveInvoiceWithPrint(event){

  }

}
