import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-purchase-bill',
  templateUrl: './add-purchase-bill.component.html',
  styleUrls: ['./add-purchase-bill.component.scss']
})
export class AddPurchaseBillComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  selectValue = [
    {id:1,name:'Cash'},
    {id:2,name:'Cheque'},
    {id:3,name:'Card Payment'},
    {id:4,name:'Wallet'}
   ];
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Purchase' }, { label: 'Add Purchase Bill', active: true }];
  }

}
