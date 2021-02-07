import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getJSON } from 'jquery';
import Swal from 'sweetalert2';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
  stringifiedData: any;
  constructor(public catservice: CategoryService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.catservice.formData = {
      CategoryId: 0,
      CategoryName: ''
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.CategoryId == 0) {
      this.insertRecord(form);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Category Added',
        showConfirmButton: false,
        timer: 1500
      });
      this.catservice.getCategoryList();
      this.catservice.formData = {
        CategoryId: 0,
        CategoryName: ''
      }
    }
    else {
      this.updateRecord(form);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Category Updated.',
        showConfirmButton: false,
        timer: 1500
      });
      this.catservice.getCategoryList();
      this.catservice.formData = {
        CategoryId: 0,
        CategoryName: ''
      }
    }
  
    
  }
  insertRecord(form: NgForm) {
    
    this.catservice.addCategory(form.value).subscribe(res => {
 
      this.catservice.getCategoryList();
       
    });
  }
  updateRecord(form: NgForm) {
    this.catservice.updateCategory(form.value).subscribe(res => {
     
      this.catservice.getCategoryList();
    });
  }
}
