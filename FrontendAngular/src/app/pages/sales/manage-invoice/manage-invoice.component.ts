import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery'; 
import { SharedService } from '../shared.service';
import {Routes, RouterModule, Router} from '@angular/router';
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Invoice } from '../SalesItem.model';
import Swal from "sweetalert2";

class DataTablesResponse {
	data: any[];
	draw: number;
	recordsFiltered: number;
	recordsTotal: number;
}


@Component({
  selector: 'app-manage-invoice',
  templateUrl: './manage-invoice.component.html',
  styleUrls: ['./manage-invoice.component.scss']
})
export class ManageInvoiceComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  @ViewChild(DataTableDirective, { static: false })
	dtElement: DataTableDirective;
  invoices: Invoice[] = [];
	isDtInitialized: boolean = false;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router: Router,
		private http: HttpClient,
		public sharedservice: SharedService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Sales' }, { label: 'Manage Invoice', active: true }];
    this.getAllInvoices();
  }
  addInvoice(){
    this.router.navigate(['/sales/new-invoice']);
  }

  getAllInvoices() {
		this.sharedservice.getAllInv().subscribe((data) => {
			this.invoices = data as Invoice[] ;
			console.log(this.invoices);
			if (this.isDtInitialized) {
				this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
					dtInstance.destroy();
					this.dtTrigger.next();
				});
			} else {
				this.isDtInitialized = true;
				this.dtTrigger.next();
			}
		});
  }
  deleteInvoice(inv: Invoice) {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#34c38f",
			cancelButtonColor: "#ff3d60",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.value) {
				this.sharedservice.deleteInv(inv.SalesOrderOfflineId).subscribe((res) => {
          this.getAllInvoices();
					console.log(res);
				});
				Swal.fire(
					"Deleted!",
					inv.InvoiceNo + " has been deleted.",
					"success"
				);
			}
		});
	}
}