import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import {Routes, RouterModule, Router} from '@angular/router';
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { SalesReturn } from '../SalesItem.model';
import Swal from "sweetalert2";

class DataTablesResponse {
	data: any[];
	draw: number;
	recordsFiltered: number;
	recordsTotal: number;
}

@Component({
  selector: 'app-manage-sales-return',
  templateUrl: './manage-sales-return.component.html',
  styleUrls: ['./manage-sales-return.component.scss']
})
export class ManageSalesReturnComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  @ViewChild(DataTableDirective, { static: false })
	dtElement: DataTableDirective;
  SalesReturn: SalesReturn[] = [];
	isDtInitialized: boolean = false;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router: Router,
		private http: HttpClient,
		public sharedservice: SharedService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Sales' }, { label: 'Manage Sales Return', active: true }];
    this.getAllInvoices();
  }
  getAllInvoices() {
		this.sharedservice.getAllSalesReturn().subscribe((data) => {
			this.SalesReturn = data as SalesReturn[] ;
			console.log(this.SalesReturn);
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
  deleteInvoice(inv:SalesReturn ) {
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
				this.sharedservice.deleteInv(inv.SalesReturnId).subscribe((res) => {
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
	addSalesReturn(){
		this.router.navigate(['/sales/sales-return']);
	}

}
