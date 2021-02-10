import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.scss']
})
export class AddproductsComponent implements OnInit {

 
 // breadcrumb items
 breadCrumbItems: Array<{}>;
 selectValue = ['Touchscreen', 'Call Function', 'Notifications', 'Fitness', 'Outdoor'];

 constructor() { }

 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Add Product', active: true }];
 }
}

