import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../brands.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-edit-brand',
  templateUrl: './add-edit-brand.component.html',
  styleUrls: ['./add-edit-brand.component.scss']
})
export class AddEditBrandComponent implements OnInit {
  stringifiedData: any;
  constructor(public brandservice: BrandsService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.brandservice.formData = {
      BrandId: 0,
      BrandName: ''
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.BrandId == 0) {
      this.insertRecord(form);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: form.value.BrandName+' Added',
        showConfirmButton: false,
        timer: 1500
      });
      this.brandservice.getBrandList();
      this.brandservice.formData = {
        BrandId: 0,
        BrandName: ''
      }
    }
    else {
      this.updateRecord(form);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: form.value.BrandName+' Updated',
        showConfirmButton: false,
        timer: 1500
      });
      this.brandservice.getBrandList();
      this.brandservice.formData = {
        BrandId: 0,
        BrandName: ''
      }
    }
  
    
  }
  insertRecord(form: NgForm) {
    
    this.brandservice.addBrand(form.value).subscribe(res => {
 
      this.brandservice.getBrandList();
       
    });
  }
  updateRecord(form: NgForm) {
    this.brandservice.updateBrand(form.value).subscribe(res => {
     
      this.brandservice.getBrandList();
    });
  }
}
