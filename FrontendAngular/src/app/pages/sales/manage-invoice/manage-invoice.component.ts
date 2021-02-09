import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery'; 
import { SharedService } from '../shared.service';
import {Routes, RouterModule, Router} from '@angular/router';





// $(document).ready( function () {
//   ($('#manage-invoice') as any).DataTable();
// });

// ($('#manage-invoice') as any).DataTable();
@Component({
  selector: 'app-manage-invoice',
  templateUrl: './manage-invoice.component.html',
  styleUrls: ['./manage-invoice.component.scss']
})
export class ManageInvoiceComponent implements OnInit {
  breadCrumbItems: Array<{}>;


  constructor(public catservice: SharedService,
    private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Sales' }, { label: 'Manage Invoice', active: true }];

  }
  addInvoice(){
    this.router.navigate(['/sales/new-invoice']);
  }
}