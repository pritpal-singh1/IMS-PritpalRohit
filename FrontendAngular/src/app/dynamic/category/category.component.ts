import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private service:SharedService) { }
  CategoryList: any=[];
  ngOnInit(): void {
    this.refreshCatList();
  }
  refreshCatList() {
    this.service.getCategoryList().subscribe(data => {
      this.CategoryList = data;
    } );

  }
}
