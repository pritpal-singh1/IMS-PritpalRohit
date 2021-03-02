import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { from } from 'rxjs';
import {SupplierService} from '../../master.service';
import { SupplierModule } from '../supplier.module';
import {DataTablesModule} from 'angular-datatables';
import { Subject } from 'rxjs';
import {Supplier} from '../../master.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DataTableDirective } from "angular-datatables";




class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-manage-supplier',
  templateUrl: './manage-supplier.component.html',
  styleUrls: ['./manage-supplier.component.scss']
})
export class ManageSupplierComponent implements OnInit {

  suppliers: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  readonly APIUrl = "http://127.0.0.1:8000";
  @ViewChild(DataTableDirective, { static: false })
	dtElement: DataTableDirective;
  isDtInitialized: boolean = false;


  breadCrumbItems: Array<{}>;

  constructor(private router:Router, private supplierservice: SupplierService, private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'supplier' }, { label: 'Manage Supplier', active: true }];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.getSuppliers();

  }
  
  getSuppliers(){
    this.supplierservice.getSupplierList().subscribe( data => {
      console.log(data);
      this.suppliers = data;
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

  addSupplier(){
    this.router.navigate(['/master/supplier/add-supplier']);

  }
  
  deleteSupplier(supplier: Supplier){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if(result.value){
        this.supplierservice.deleteSupplier(supplier).subscribe(data =>{

          this.getSuppliers();
        });
		Swal.fire(
			"Deleted!",
			supplier.CompanyName + " has been deleted.",
			"success"
		);
      }
    });
  }

  editSupplier(supplier: Supplier){
    this.supplierservice.formdata = Object.assign({},supplier);
    this.router.navigate(['/master/supplier/add-supplier']);
  }

}
