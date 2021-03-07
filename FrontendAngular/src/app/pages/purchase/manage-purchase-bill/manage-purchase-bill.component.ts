import { Component, OnInit, ViewChild } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import { DataTableDirective } from "angular-datatables";
import {PurchaseBill} from '../purchase.model';
import { Subject } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import {PurchaseService} from '../purchase.service';
import Swal from "sweetalert2";

class DataTablesResponse {
	data: any[];
	draw: number;
	recordsFiltered: number;
	recordsTotal: number;
}

@Component({
  selector: 'app-manage-purchase-bill',
  templateUrl: './manage-purchase-bill.component.html',
  styleUrls: ['./manage-purchase-bill.component.scss']
})
export class ManagePurchaseBillComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  @ViewChild(DataTableDirective, { static: false })
	dtElement: DataTableDirective;
  bills: PurchaseBill[] = [];
  isDtInitialized: boolean = false;
  dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router:Router,private http: HttpClient,public purchaseservice:PurchaseService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Purchase' }, { label: 'Manage Purchase Bill', active: true }];
    this.getAllBills();
  }
  addPurchaseBill(){
    this.router.navigate(['/purchase/add-purchase-bill']);
  }
  getAllBills(){
    this.purchaseservice.getAllBills().subscribe(data =>{
      this.bills = data as PurchaseBill[];
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
  deleteBill(bill: PurchaseBill) {
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
				this.purchaseservice.deleteBill(bill.PurchaseBillId).subscribe((res) => {
          this.getAllBills();
					console.log(res);
				});
				Swal.fire(
					"Deleted!",
					bill.BillNo + " has been deleted.",
					"success"
				);
			}
		});
	}

}
