import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';


import { Observable } from 'rxjs';

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
 constructor(public catservice: CategoryService) { }

 ngOnInit(): void {
   this.refreshCatList();
  }
 

  refreshCatList() {
    this.catservice.getCategoryList().subscribe(data => {
      this.CategoryList = data
    });
  }
  editCategory(cat: Category) {
    this.catservice.formData = Object.assign({}, cat);
  }
  deleteCategory(cat: Category) {
    this.catservice.deleteCategory(cat).subscribe(res => {
      this.refreshCatList();
     
    });
  }
}
