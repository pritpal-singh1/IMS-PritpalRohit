import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {SupplierService} from '../../master.service';
import { SupplierModule } from '../supplier.module';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {


  breadCrumbItems: Array<{}>;
  selectValue = [
    {id:1,name:'Active'},
    {id:2,name:'Disaabled'},
    // {id:3,name:'Card Payment'},
    // {id:4,name:'Wallet'}
   ];

  constructor(public supplierService: SupplierService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'supplier' }, { label: 'Add Supplier', active: true }];
    this.restForm()
  }
  restForm(form? : NgForm){
    if(form != null)
      form.resetForm();
    this.supplierService.formdata = {
      SupplierId: 0,
      SupplierName: '',
      CompanyName:'',
      Address:'',
      City:'',
      State:'',
      Pincode:0,
      Email:'',
      Contact:0,
      PANNo:'',
      GSTIN:'',
      Status:'',
      CreatedAt:''
    }
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.insertRecord(form); 
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Supplier Added',
      showConfirmButton: false,
      timer: 1500
    });
    this.supplierService.formdata ={
      SupplierId: 0,
      SupplierName: '',
      CompanyName:'',
      Address:'',
      City:'',
      State:'',
      Pincode:0,
      Email:'',
      Contact:0,
      PANNo:'',
      GSTIN:'',
      Status:'',
      CreatedAt:''
    }
  }
  insertRecord(form: NgForm){
    this.supplierService.addSupplier(form.value).subscribe(res => {
      this.supplierService.getSupplierList();
    });
  }

}
