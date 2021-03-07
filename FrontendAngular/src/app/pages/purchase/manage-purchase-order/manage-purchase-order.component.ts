import { Component, OnInit,ViewChild } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import { Subject } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import {PurchaseService} from '../purchase.service';
import Swal from "sweetalert2";
import { DataTableDirective } from "angular-datatables";
import {PurchaseOrder} from '../purchase.model';

class DataTablesResponse {
	data: any[];
	draw: number;
	recordsFiltered: number;
	recordsTotal: number;
}


@Component({
  selector: 'app-manage-purchase-order',
  templateUrl: './manage-purchase-order.component.html',
  styleUrls: ['./manage-purchase-order.component.scss']
})
export class ManagePurchaseOrderComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  @ViewChild(DataTableDirective, { static: false })
	dtElement: DataTableDirective;
  orders: PurchaseOrder[] = [];
  isDtInitialized: boolean = false;
  dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();
  constructor(private router:Router,private http: HttpClient,public purchaseservice:PurchaseService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Purchase' }, { label: 'Manage Purchase Order', active: true }];
    this.getAllOrders();
  }
  addPurchaseOrder(){
    this.router.navigate(['/purchase/purchase-order']);
  }
  getAllOrders(){
    this.purchaseservice.getAllOrders().subscribe(data =>{
      this.orders = data as PurchaseOrder[];
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
  deleteBill(order: PurchaseOrder) {
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
				this.purchaseservice.deleteOrder(order.PurchaseOrderId).subscribe((res) => {
          this.getAllOrders();
					console.log(res);
				});
				Swal.fire(
					"Deleted!",
					order.BillNo + " has been deleted.",
					"success"
				);
			}
		});
	}


}
