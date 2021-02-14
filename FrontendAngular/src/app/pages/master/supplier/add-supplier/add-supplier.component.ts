import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {


  breadCrumbItems: Array<{}>;
  selectValue = [
    {id:1,name:'Active'},
    {id:2,name:'Disaabled'},
    // {id:3,name:'Card Payment'},
    // {id:4,name:'Wallet'}
   ];

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'supplier' }, { label: 'Add Supplier', active: true }];

  }

}
