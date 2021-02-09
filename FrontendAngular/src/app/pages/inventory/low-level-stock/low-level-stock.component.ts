import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-low-level-stock',
  templateUrl: './low-level-stock.component.html',
  styleUrls: ['./low-level-stock.component.scss']
})
export class LowLevelStockComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Inventory' }, { label: 'Low Level Stock', active: true }];

  }

}
