import { Component, OnInit } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-manage-purchase-bill',
  templateUrl: './manage-purchase-bill.component.html',
  styleUrls: ['./manage-purchase-bill.component.scss']
})
export class ManagePurchaseBillComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Purchase' }, { label: 'Manage Purchase Bill', active: true }];

  }
  addPurchaseBill(){
    this.router.navigate(['/purchase/add-purchase-bill']);
  }

}
