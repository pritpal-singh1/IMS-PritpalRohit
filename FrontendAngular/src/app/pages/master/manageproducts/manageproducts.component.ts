import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


@Component({
  selector: 'app-manageproducts',
  templateUrl: './manageproducts.component.html',
  styleUrls: ['./manageproducts.component.scss']
})
export class ManageproductsComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  products: Product[]=[];
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private router:Router, private http: HttpClient, public productservice: ProductService) { }
  ngOnInit(): void { 
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'Manage Products', active: true }];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.productservice.getProductList().subscribe(data => {
      this.products = data;
      console.log(this.products);
      this.dtTrigger.next();
    })
    // this.http.get<Product[]>('http://127.0.0.1:8000/product/')
    //   .subscribe(data => {
    //     this.products = ;
    //     console.log(this.products);
    //     // Calling the DT trigger to manually render the table
    //     this.dtTrigger.next();
    //   });
    }
  addExpense(){
    this.router.navigate(['/master/add-products']);
  }
  // getProductList(): void {
  //   this.productservice.getProductList()
  //   .subscribe(resp => this.products = resp);
  // }
  // ngOnDestroy(): void {
  //   // Do not forget to unsubscribe the event
  //   this.dtTrigger.unsubscribe();
  // }
}
