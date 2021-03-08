import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-low-level-stock',
  templateUrl: './low-level-stock.component.html',
  styleUrls: ['./low-level-stock.component.scss']
})

export class LowLevelStockComponent implements OnInit {
  public LowLevelLimitData:any[];
  breadCrumbItems: Array<{}>;

  constructor(public lowlevellimitservice: InventoryService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Inventory' }, { label: 'Low Level Stock', active: true }];
    this.getLowLevelLimit();
  }
  getLowLevelLimit() {
    this.lowlevellimitservice.getLowLevelLimit().subscribe(data => {
      this.LowLevelLimitData = data as any;
      console.log(this.LowLevelLimitData);
    });
    
  }

}
