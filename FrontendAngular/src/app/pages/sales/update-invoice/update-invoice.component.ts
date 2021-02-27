import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../sales/shared.service';
import { Invoice, SalesItem } from '../SalesItem.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.scss']
})
export class UpdateInvoiceComponent implements OnInit {
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
    Balance: 0,
    AmountPaid: 0,
    Status: "Paid",
    GST: 0,
    SalesItems: [], 
  };
  orders: SalesItem[];
  ProductData: any[];
  AllProductList: any;

  salesitem = new SalesItem();
  dataarray = [];
  constructor(public httpClient: HttpClient, private router: Router, private route: ActivatedRoute,public salesservice: SharedService) { }

  ngOnInit(): void {
    this.getInvoiceDetails(this.route.snapshot.paramMap.get('id'));
    this.getProductList();
    this.salesitem = new SalesItem();
    this.breadCrumbItems = [
      { label: "Sales" },
      { label: "Update Invoice", active: true },
    ];
    

  }
  getProductList() {
    this.httpClient.get("http://127.0.0.1:8000/product/").subscribe((data) => {
      this.AllProductList = data as any;
      console.log(this.AllProductList);
    });
  } 
  getInvoiceDetails(id) {
    this.salesservice.getInvoiceById(id).subscribe((data) => {
      this.invoice = data as Invoice;
      console.log(this.invoice);
      this.orders = this.invoice.SalesItems;
      console.log(Object.keys(this.orders).length );
      for (let i = 0; i <Object.keys(this.orders).length;i++) {
        console.log(this.orders[i]);
        this.salesitem = new SalesItem();
        this.salesitem.Quantity = this.orders[i].Quantity;
        this.salesitem.ProductId = this.orders[i].ProductId;
        this.salesitem.SalePrice = this.orders[i].SalePrice;
        this.salesitem.GST = this.orders[i].GST;
        this.salesitem.Amount = this.orders[i].Amount;
        this.dataarray.push(this.salesitem);
        
      }
      
    });
    
  }
  addItem() {
    this.isShow = false;
    this.salesitem = new SalesItem();
    this.dataarray.push(this.salesitem);
  }
  removeItem(index) {
    this.dataarray.splice(index);
    var i;
    this.invoice.TotalAmount = 0;
    for (i = 0; i < this.dataarray.length; i++) {
      // console.log("This Dataraay " + this.dataarray);
      // console.log("This Amount " + this.dataarray[i].Amount);
      this.invoice.TotalAmount =
        this.invoice.TotalAmount +parseInt(this.dataarray[i].Amount);
    }

    this.invoice.GST = 0;
    for (i = 0; i < this.dataarray.length; i++) {
      console.log("This Dataraay " + this.dataarray);
      console.log("This Amount " + this.dataarray[i].Amount);
      this.invoice.GST =
        this.invoice.GST + parseInt(this.dataarray[i].GST)  ;
    }
  }
  getbal() {
    this.invoice.Balance = this.invoice.TotalAmount - this.invoice.AmountPaid;
    if (this.invoice.Balance != 0)
    {
      this.showbalance = true;
      this.invoice.Status = "Unpaid";
    }
  }
  calculate(obj) {
    obj.Amount = obj.SalePrice * obj.Quantity;
    var i;
    this.invoice.SubTotal = 0;
    for (i = 0; i < this.dataarray.length; i++) {
      // console.log("This Dataraay " + this.dataarray);
      // console.log("This Amount " + this.dataarray[i].Amount);
      this.invoice.SubTotal =
        this.invoice.SubTotal + parseInt(this.dataarray[i].Amount)  ;
    }

    this.invoice.GST = 0;
    for (i = 0; i < this.dataarray.length; i++) {
      console.log("This Dataraay " + this.dataarray);
      console.log("This Amount " + this.dataarray[i].Amount);
      this.invoice.GST =
        this.invoice.GST + parseInt(this.dataarray[i].GST)  ;
    }
    this.invoice.TotalAmount = this.invoice.GST + this.invoice.SubTotal; 
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
  saveInvoice(event) {
    this.invoice.SalesItems = this.dataarray;
    console.log(this.invoice);
    this.salesservice.updateInvoice(this.invoice).subscribe(data => {
      console.log(data);
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: this.invoice.InvoiceNo +" Successfully Updated",
      showConfirmButton: false,
      timer: 1500
    });
    event.preventDefault();

    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/sales/manage-invoice']));
    
    
  }

}
