import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fast-moving-items',
  templateUrl: './fast-moving-items.component.html',
  styleUrls: ['./fast-moving-items.component.scss']
})
export class FastMovingItemsComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Inventory' }, { label: 'Fast Moving Items', active: true }];

  }

}
