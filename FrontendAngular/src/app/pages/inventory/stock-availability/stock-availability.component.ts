import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-availability',
  templateUrl: './stock-availability.component.html',
  styleUrls: ['./stock-availability.component.scss']
})
export class StockAvailabilityComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Inventory' }, { label: 'Stock Availability', active: true }];

  }

}
