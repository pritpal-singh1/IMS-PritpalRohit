import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery'; 
import 'datatables.net';
import { SharedService } from '../shared.service';
import { Category } from './data';



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
  // dataTable: any;
  // dtOptions: any;
  // tableData: any=[];
  // @ViewChild('dataTable', { static: true }) table;
  CategoryList: any = [];
  BtnName: string;
  dep: any;
  catmodel :any;
  constructor(public catservice: SharedService) { }

  ngOnInit(): void {
    this.refreshdepList();
  }
  refreshdepList() {
    this.catservice.getCatList().subscribe(data => {
      this.CategoryList = data;
      this.BtnName = "Hello";
    
      //     this.dtOptions = {
      //       data: this.tableData,
      //       columns: [
      //         { title: 'Category Id', data: 'CategoryId' },
      //         { title: 'Category Name', data: 'CategoryName' },
      //         // { title: 'First Name', data: 'first_name' },
      //         // { title: 'Last Name', data: 'last_name' },
      //         // { title: 'Avatar', data: 'avatar' },
      //       ]
      //     };
      //   }, err => { }, () => {
      //     this.dataTable = $(this.table.nativeElement);
      //     this.dataTable.DataTable(this.dtOptions);
      //   });
      // }
    });
    
  }
  editCategory(item) {
    this.catmodel.name = item.name;
    console.log(item);
  }
  
    }