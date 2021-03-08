import { Component, OnInit, ViewChild } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import { Subject } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import {PurchaseService} from '../purchase.service';
import Swal from "sweetalert2";
import { DataTableDirective } from "angular-datatables";
import {PurchaseReturn} from '../purchase.model';

class DataTablesResponse {
	data: any[];
	draw: number;
	recordsFiltered: number;
	recordsTotal: number;
}


@Component({
  selector: 'app-manage-purchase-return',
  templateUrl: './manage-purchase-return.component.html',
  styleUrls: ['./manage-purchase-return.component.scss']
})
export class ManagePurchaseReturnComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  @ViewChild(DataTableDirective, { static: false })
	dtElement: DataTableDirective;
  returns: PurchaseReturn[] = [];
  isDtInitialized: boolean = false;
  dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();
  constructor(private router:Router,private http: HttpClient,public purchaseservice:PurchaseService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Purchase' }, { label: 'Manage Purchase Return', active: true }];
    this.getAllReturns();

  }
  addPurchaseReturn(){
    this.router.navigate(['/purchase/purchase-return']);
  }
  getAllReturns(){
    this.purchaseservice.getAllReturns().subscribe(data =>{
      this.returns = data as PurchaseReturn[];
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
  deleteBill(returns: PurchaseReturn) {
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
				this.purchaseservice.deleteReturn(returns.PurchaseReturnId).subscribe((res) => {
          this.getAllReturns();
					console.log(res);
				});
				Swal.fire(
					"Deleted!",
					returns.ReturnBillNo + " has been deleted.",
					"success"
				);
			}
		});
	}

}
