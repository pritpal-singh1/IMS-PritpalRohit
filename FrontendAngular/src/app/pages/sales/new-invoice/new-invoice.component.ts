import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  Input,
  NgModule,
} from "@angular/core";
import {
  NgbDate,
  NgbCalendar,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { SalesItem, Invoice } from "../SalesItem.model";
import { HttpClient } from "@angular/common/http";
import { toInteger } from "@ng-bootstrap/ng-bootstrap/util/util";
import { SharedService } from "../../sales/shared.service";
import Swal from 'sweetalert2';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: "app-new-invoice",
  templateUrl: "./new-invoice.component.html",
  styleUrls: ["./new-invoice.component.scss"],
})
export class NewInvoiceComponent {
  isShow: boolean = false;
  showbalance: boolean = false;
  stockQuantity;
  purchaseprice;
  MRP;
  invNo;

  breadCrumbItems: Array<{}>;
  selectValue = [
    { id: 1, name: "GST" },
    { id: 2, name: "Non GST" },
 
  ];
  paymentMode = [
    { id: 1, name: "Cash" },
    { id: 2, name: "Cheque" },
    { id: 2, name: "Card Payment" },
    { id: 2, name: "Wallet" },
 
  ];

  invoice: Invoice = {
    SalesOrderOfflineId: 0,
    InvoiceNo: "",
    Date: "",
    Contact: "",
    CustomerName: "",
    PaymentMode: "",
    TotalAmount: 0,
    SubTotal: 0,
    Balance:0,
    AmountPaid: 0,
    Status: "Paid",
    GST: 0,
    SalesItems: [],
  };
  ProductData: any[];
  AllProductList: any;

  salesitem = new SalesItem();
  dataarray = [];
  constructor(public httpClient: HttpClient, private router: Router,public salesservice: SharedService) {
   
   }
  getInvoice() {
    this.salesservice.getInvoiceNo().subscribe((data) => {
      this.invNo = data;
      console.log(this.invNo + "");
      this.invoice.InvoiceNo =  "INV-00"+(this.invNo+1);
    });
    
  }
  ngOnInit() {
    
    this.getInvoice();
    this.salesitem = new SalesItem();
    this.breadCrumbItems = [
      { label: "Users" },
      { label: "Add Employee", active: true },
    ];
    this.getProductList();
    this.dataarray.push(this.salesitem);
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
        this.invoice.SubTotal = 0;
        for (i = 0; i < this.dataarray.length; i++) {
          console.log("This Dataraay " + this.dataarray);
          console.log("This Amount " + this.dataarray[i].Amount);
          this.invoice.SubTotal =
            this.invoice.SubTotal + this.dataarray[i].Amount;
        }
        // this.invoice.SubTotal += obj.Amount;
        
        //similarly here we iterate a loop which will calculate the GST as soon as user selects a product from 
        //the list
      
        this.invoice.GST = 0;
        for (i = 0; i < this.dataarray.length; i++) {
          console.log("This Dataraay " + this.dataarray);
          console.log("This Amount " +  typeof this.dataarray[i].GST);
          this.invoice.GST =
            this.invoice.GST + parseInt(this.dataarray[i].GST);
        }
        // this.invoice.GST += Number(obj.GST);
        this.invoice.TotalAmount = this.invoice.GST + this.invoice.SubTotal; 
        
        // console.log(this.ProductData);
      });
    
        this.isShow = true;
      
  }

  //this is the api call for getting all the product name list from the database and populate on the item select menu

  getProductList() {
    this.httpClient.get("http://127.0.0.1:8000/product/").subscribe((data) => {
      this.AllProductList = data as any;
      console.log(this.AllProductList);
    });
  } 
  //this function is for the dynamic form which will be added when used clicks on add items button
  addItem() {
    this.isShow = false;
    this.salesitem = new SalesItem();
    this.dataarray.push(this.salesitem);
  }
    //this function will send all the data from the form in the form of an single invoice object to the backend api 
  
  onSubmit() {
    console.log(this.dataarray);
  }
  //when used click a product item from the selected list this method is called 

  // removeItem(index) {
  //   this.dataarray.splice(index,1);
  //   var i;
  //   this.invoice.TotalAmount = 0;
  //   for (i = 0; i < this.dataarray.length; i++) {
  //     // console.log("This Dataraay " + this.dataarray);
  //     // console.log("This Amount " + this.dataarray[i].Amount);
  //     this.invoice.TotalAmount =
  //       this.invoice.TotalAmount + this.dataarray[i].Amount;
  //   }

  //   this.invoice.GST = 0;
  //   for (i = 0; i < this.dataarray.length; i++) {
  //     console.log("This Dataraay " + this.dataarray);
  //     console.log("This Amount " + this.dataarray[i].Amount);
  //     this.invoice.GST =
  //       this.invoice.GST + parseInt(this.dataarray[i].GST)  ;
  //   }
  // }
  removeItem(index){
    this.invoice.SubTotal -= this.dataarray[index].Amount;
    this.invoice.GST -= this.dataarray[index].GST;
    this.invoice.TotalAmount = this.invoice.SubTotal + this.invoice.GST;
    this.dataarray.splice(index,1);
  }
  //this calculate function is called when user changes the item quantity in the list 
  // calculate(obj) {
  //   obj.Amount = obj.SalePrice * obj.Quantity;
  //   var i;
  //   this.invoice.SubTotal = 0;
  //   for (i = 0; i < this.dataarray.length; i++) {
  //     // console.log("This Dataraay " + this.dataarray);
  //     // console.log("This Amount " + this.dataarray[i].Amount);
  //     this.invoice.SubTotal =
  //       this.invoice.SubTotal + this.dataarray[i].Amount;
  //   }

  //   this.invoice.GST = 0;
  //   for (i = 0; i < this.dataarray.length; i++) {
  //     console.log("This Dataraay " + this.dataarray);
  //     console.log("This Amount " + this.dataarray[i].Amount);
  //     this.invoice.GST =
  //       this.invoice.GST + parseInt(this.dataarray[i].GST)  ;
  //   }
  //   this.invoice.TotalAmount = this.invoice.GST + this.invoice.SubTotal; 
  // }
  calculate(obj){
    this.invoice.SubTotal -= obj.Amount;
    this.invoice.GST -= Number(obj.GST);
    obj.Amount = obj.SalePrice * obj.Quantity;
    obj.GST = obj.GST * obj.Quantity;
    this.invoice.SubTotal += obj.Amount;
    this.invoice.GST += obj.GST;
    this.invoice.TotalAmount = this.invoice.GST + this.invoice.SubTotal; 
  }

  saveInvoice(event) {
    this.invoice.SalesItems = this.dataarray;
    console.log(this.invoice);
    this.salesservice.addNewSale(this.invoice).subscribe(data => {
      console.log(data as any);
      console.log(data['SalesId']);
      this.router.navigate(['/sales/print-invoice/'+data['SalesId']]);
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: "New Product "+ this.invoice.InvoiceNo +" Created",
      showConfirmButton: false,
      timer: 1500
    });
    event.preventDefault();

    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/sales/new-invoice']));
    
    // this.invoice = {
    //   InvoiceNo: "",
    //   Date: "",
    //   Contact: "",
    //   CustomerName: "",
    //   PaymentMode: "",
    //   TotalAmount: 0,
    //   SubTotal: 0,
    //   Balance:0,
    //   AmountPaid: 0,
    //   Status: "Paid",
    //   GST: 0,
    //   SalesItems: [],
    // };
    // this.getInvoice();
  }
  saveInvoiceWithoutPrint(event) {
    this.invoice.SalesItems = this.dataarray;
    console.log(this.invoice);
    this.salesservice.addNewSale(this.invoice).subscribe(data => {
      
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: "New Product "+ this.invoice.InvoiceNo +" Created",
      showConfirmButton: false,
      timer: 1500
    });
    event.preventDefault();

    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/sales/new-invoice']));
    
    
  }
  getbal() {
    this.invoice.Balance = this.invoice.TotalAmount - this.invoice.AmountPaid;
    if (this.invoice.Balance != 0)
    {
      this.showbalance = true;
      this.invoice.Status = "Unpaid";
    }
  }
}
