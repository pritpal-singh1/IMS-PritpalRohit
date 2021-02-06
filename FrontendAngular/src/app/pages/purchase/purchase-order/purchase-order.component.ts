import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  selectValue: Array<{}>;
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Purchase' }, { label: 'Purchase Order', active: true }];
    this.selectValue = [
      {id:1,name:'Cash'},
      {id:2,name:'Cheque'},
      {id:3,name:'Card Payment'},
      {id:4,name:'Wallet'}
     ];
  }

}
