import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';


import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { SharedService } from '../shared.service';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],

})
export class CategoryComponent implements OnInit {
 // bread crum data
 CategoryList: any = [];
 BtnName: string;
 dep: any;
 catmodel :any;
  len: number;
 constructor(public catservice: CategoryService) { }

  ngOnInit(): void {
  
    this.refreshCatList();
   
  }
 

  refreshCatList() {
    this.catservice.getCategoryList();
   
    
  }
  editCategory(cat: Category) {
    this.catservice.formData = Object.assign({}, cat);
  }
  deleteCategory(cat: Category) {
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.catservice.deleteCategory(cat).subscribe(res => {
      
          this.refreshCatList();
         
        });
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
}
