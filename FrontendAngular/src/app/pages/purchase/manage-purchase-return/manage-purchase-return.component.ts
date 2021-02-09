import { Component, OnInit } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-manage-purchase-return',
  templateUrl: './manage-purchase-return.component.html',
  styleUrls: ['./manage-purchase-return.component.scss']
})
export class ManagePurchaseReturnComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Purchase' }, { label: 'Manage Purchase Return', active: true }];

  }
  addPurchaseReturn(){
    this.router.navigate(['/purchase/purchase-return']);
  }
}
