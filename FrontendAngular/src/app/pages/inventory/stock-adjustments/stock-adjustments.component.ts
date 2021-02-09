import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-adjustments',
  templateUrl: './stock-adjustments.component.html',
  styleUrls: ['./stock-adjustments.component.scss']
})
export class StockAdjustmentsComponent implements OnInit {

  breadCrumbItems: Array<{}>;


  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Inventory' }, { label: 'Stock Adjustments', active: true }];

  }

}
