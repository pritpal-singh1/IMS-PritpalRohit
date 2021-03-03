import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-stock-availability',
  templateUrl: './stock-availability.component.html',
  styleUrls: ['./stock-availability.component.scss']
})
export class StockAvailabilityComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  public AllBrands: any = [];
  public AllCategories: any = [];
  public AllProductList: any = [];
  public Result: any = [];

  public AllIds: any = {
    brandId:'',
    productId:'',
    categoryId:'',
    itemCode:''
    
  }
  today= new Date();
  jstoday = '';

  constructor(private http: HttpClient, private searchingservice: InventoryService) {

    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
   }

  ngOnInit(): void {

    this.breadCrumbItems = [{ label: 'Inventory' }, { label: 'Stock Availability', active: true }];
    this.getBrands();
    this.getCategories();
    this.getProductList();
    console.log(this.AllIds);
  }
  getBrands() {
    this.http.get("http://127.0.0.1:8000/brand/").subscribe(data => {
      this.AllBrands = data as any;
      
    });
  }
  getCategories() {
    this.http.get("http://127.0.0.1:8000/category/").subscribe(data => {
      this.AllCategories = data as any;
      
    });
  }
  getProductList() {
    this.http.get("http://127.0.0.1:8000/product/").subscribe(data => {
      this.AllProductList = data as any;
      
    });
  }

  searchData() {
    console.log(this.AllIds);
    this.searchingservice.getSearchedData(this.AllIds).subscribe(data => {
      this.Result = data;
      console.log(this.Result);
    })
  }

}
