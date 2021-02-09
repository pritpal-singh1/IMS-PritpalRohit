import { Component, OnInit } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';


@Component({
  selector: 'app-manage-purchase-order',
  templateUrl: './manage-purchase-order.component.html',
  styleUrls: ['./manage-purchase-order.component.scss']
})
export class ManagePurchaseOrderComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Purchase' }, { label: 'Manage Purchase Order', active: true }];

  }
  addPurchaseOrder(){
    this.router.navigate(['/purchase/purchase-order']);
  }


}
