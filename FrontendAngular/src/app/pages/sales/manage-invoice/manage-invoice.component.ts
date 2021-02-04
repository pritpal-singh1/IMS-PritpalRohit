import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'; 
import 'datatables.net';
import { SharedService } from '../shared.service';


$(document).ready( function () {
  ($('#manage-invoice') as any).DataTable();
} );
// ($('#manage-invoice') as any).DataTable();
@Component({
  selector: 'app-manage-invoice',
  templateUrl: './manage-invoice.component.html',
  styleUrls: ['./manage-invoice.component.scss']
})
export class ManageInvoiceComponent implements OnInit {
  CategoryList: any = [];
  constructor(public catservice: SharedService) { }

  ngOnInit(): void {
    this.refreshdepList();
  }
  refreshdepList() {
    this.catservice.getCatList().subscribe(data => {
      this.CategoryList = data;
      console.log(this.CategoryList);
    });
  }
}

