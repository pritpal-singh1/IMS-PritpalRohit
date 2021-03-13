import { Component, OnInit } from '@angular/core';
import {SalesReturn,ReturnItem} from '../SalesItem.model';
import { SharedService } from "../../sales/shared.service";
import Swal from 'sweetalert2';
import {NavigationEnd, Router,ActivatedRoute} from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-update-sales-return',
  templateUrl: './update-sales-return.component.html',
  styleUrls: ['./update-sales-return.component.scss']
})
export class UpdateSalesReturnComponent implements OnInit {

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
  Items: ReturnItem[]
  constructor(public httpClient: HttpClient, private router: Router, private route: ActivatedRoute,public salesservice: SharedService, public datepipe:DatePipe) { }

  ngOnInit(): void {
    this.getInvoiceDetails(this.route.snapshot.paramMap.get('id'));
  }
  getInvoiceDetails(id) {
    this.salesservice.getSalesReturnById(id).subscribe((data) => {
      this.SalesReturn = data as SalesReturn;
      this.SalesReturn.Date = this.datepipe.transform(this.SalesReturn.Date,'yyyy-MM-dd');
      console.log(this.SalesReturn);
      this.Items = this.SalesReturn.ReturnItem;
      console.log(Object.keys(this.Items).length );
      for (let i = 0; i <Object.keys(this.Items).length;i++) {
        console.log(this.Items[i]);
        this.ReturnItem = new ReturnItem();
        this.ReturnItem.Quantity = this.Items[i].Quantity;
        this.ReturnItem.ProductId = this.Items[i].ProductId;
        this.ReturnItem.SalePrice = this.Items[i].SalePrice;
        this.ReturnItem.GST = this.Items[i].GST;
        this.ReturnItem.Amount = this.Items[i].Amount;
        this.dataarray.push(this.ReturnItem);
        
      }
      if(this.SalesReturn.Balance > 0){
          this.showbalance = true;
      }
    });
    
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
        // var i;
        // this.invoice.SubTotal = 0;
        // for (i = 0; i < this.dataarray.length; i++) {
        //   console.log("This Dataraay " + this.dataarray);
        //   console.log("This Amount " + this.dataarray[i].Amount);
        //   this.invoice.SubTotal =
        //     this.invoice.SubTotal +  parseInt(this.dataarray[i].GST) ;
        // }
        
        //similarly here we iterate a loop which will calculate the GST as soon as user selects a product from 
        //the list
      
        // this.invoice.GST = 0;
        // for (i = 0; i < this.dataarray.length; i++) {
        //   console.log("This Dataraay " + this.dataarray);
        //   console.log("This Amount " +  typeof this.dataarray[i].GST);
        //   this.invoice.GST =
        //     this.invoice.GST + parseInt(this.dataarray[i].GST);
        // }
        // this.invoice.TotalAmount = this.invoice.GST + this.invoice.SubTotal; 
        
        // console.log(this.ProductData);
        this.calculate(obj);
      });
    
        this.isShow = true;
      
  }
  UpdateReturnInvoice(event){
    this.SalesReturn.ReturnItem = this.dataarray;
    this.SalesReturn.Date = new Date(this.SalesReturn.Date);
    this.salesservice.updateSalesReturn(this.SalesReturn).subscribe((data)=>{

    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: "New Product "+ this.SalesReturn.SalesReturnNo +" Updated",
      showConfirmButton: false,
      timer: 1500
    });
    event.preventDefault();

    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/sales/manage-sales-return']));
  }

}
