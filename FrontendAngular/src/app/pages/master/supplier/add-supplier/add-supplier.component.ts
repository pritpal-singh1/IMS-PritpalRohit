import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {SupplierService} from '../../master.service';
import { SupplierModule } from '../supplier.module';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {


  breadCrumbItems: Array<{}>;
  selectValue = [
    {id:1,name:'Active'},
    {id:2,name:'Disabled'}, 

  ];

  constructor(private httpClient: HttpClient, public supplierService: SupplierService, private router:Router) { }

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
      // SupplierName: '',
      CompanyName:'',
      Address:'',
      City:'',
      State:'',
      Pincode:null,
      Email:'',
      Contact:null,
      PANNo:'',
      GSTIN:'',
      Status:'Active',
      ContactPerson:'',
      ContactPersonNo:'',
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
        // SupplierName: '',
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
        ContactPerson:'',
        ContactPersonNo:'',
        CreatedAt:''
      }
      
    
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
        // SupplierName: '',
        CompanyName:'',
        Address:'',
        City:'',
        State:'',
        Pincode:null,
        Email:'',
        Contact:null,
        PANNo:'',
        GSTIN:'',
        Status:'',
        ContactPerson:'',
        ContactPersonNo:'',
        CreatedAt:''

      }
      
    
    }
    
  }
  insertRecord(form: NgForm){
    this.supplierService.addSupplier(form.value).subscribe(res => {
      this.supplierService.getSupplierList();
    });
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/supplier/manage-supplier']));
  }
  updateRecord(form: NgForm){
    this.supplierService.updateSupplier(form.value).subscribe(res =>{ });
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/supplier/manage-supplier']));
  }

}
