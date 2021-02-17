import { Component, OnInit, ViewChild, EventEmitter, Output, Input, NgModule } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SalesItem } from '../SalesItem.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent{
   
  breadCrumbItems: Array<{}>;
  selectValue = [
    {id:1,name:'Cash'},
    {id:2,name:'Cheque'},
    {id:3,name:'Card Payment'},
    {id:4,name:'Wallet'}
  ];
  ProductData: any[];
  AllProductList: any;

  salesitem = new SalesItem();
  dataarray = [];
  constructor( public httpClient: HttpClient) { 
    
  }

  ngOnInit() {
    this.salesitem = new SalesItem();
    this.breadCrumbItems = [{ label: 'Users' }, { label: 'Add Employee', active: true }];
    this.getProductList();
    this.dataarray.push(this.salesitem); 
  }

  getProductById(obj) {
    console.log(obj);
    this.httpClient.get("http://127.0.0.1:8000/product/"+obj['ProductId']).subscribe(
      data => {
        this.ProductData = data as any;
        obj.SalePrice = this.ProductData['SalePrice'];
        obj.Quantity = 1;
        obj.Amount = obj.SalePrice * obj.Quantity;
        obj.GST = this.ProductData['GST'];
        console.log(this.ProductData);

      });
  }
  getProductList() {
    this.httpClient.get("http://127.0.0.1:8000/product/").subscribe(

      data => {
        this.AllProductList = data as any;
        console.log(this.AllProductList);

      });
  }

  addItem() {
    this.salesitem = new SalesItem();
    this.dataarray.push(this.salesitem);
  }
  onSubmit() {
    console.log(this.dataarray);
  }
  removeItem(index) {
    this.dataarray.splice(index);
  }
  calculate(obj) {
    obj.Amount = obj.SalePrice * obj.Quantity;
  }
}
