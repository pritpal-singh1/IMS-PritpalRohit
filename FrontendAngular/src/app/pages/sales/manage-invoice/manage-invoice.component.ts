import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery'; 
import { SharedService } from '../shared.service';




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

  constructor(public catservice: SharedService) { }

  ngOnInit(): void {
 
  }
  
}