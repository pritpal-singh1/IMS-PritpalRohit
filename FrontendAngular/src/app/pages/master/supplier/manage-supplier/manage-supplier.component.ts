import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-supplier',
  templateUrl: './manage-supplier.component.html',
  styleUrls: ['./manage-supplier.component.scss']
})
export class ManageSupplierComponent implements OnInit {


  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'supplier' }, { label: 'Manage Supplier', active: true }];

  }

}
