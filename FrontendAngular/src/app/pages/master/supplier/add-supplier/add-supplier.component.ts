import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {SupplierService} from '../../master.service';
import { SupplierModule } from '../supplier.module';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

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

  constructor(public supplierService: SupplierService, private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'supplier' }, { label: 'Add Supplier', active: true }];
    console.log(this.supplierService.formdata);
    if(!this.supplierService.formdata){
      this.restForm();

    }
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
    if(form.value.SupplierId == 0){
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
      this.router.navigate(["/master/supplier/manage-supplier"]);
    }
    else{
      this.updateRecord(form);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '  Updated',
        showConfirmButton: false,
        timer: 1500
      });
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
      this.router.navigate(["/master/supplier/manage-supplier"]);
    }
    
  }
  insertRecord(form: NgForm){
    this.supplierService.addSupplier(form.value).subscribe(res => {
      this.supplierService.getSupplierList();
    });
  }
  updateRecord(form: NgForm){
    this.supplierService.updateSupplier(form.value).subscribe(res =>{ });
  }

}
