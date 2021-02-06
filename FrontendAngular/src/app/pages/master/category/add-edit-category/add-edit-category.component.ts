import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getJSON } from 'jquery';
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
      CategoryId: '',
      CategoryName: ''
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.CategoryId == '')
    this.insertRecord(form );
  else
      this.updateRecord(form);
    console.log("called",form.value);
    
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
