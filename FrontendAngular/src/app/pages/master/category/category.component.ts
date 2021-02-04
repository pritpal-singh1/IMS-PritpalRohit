import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './category.model';

import { tableData } from './category';

import { AdvancedService } from './category.service';
import { AdvancedSortableDirective, SortEvent } from './category-sortable.directive';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})
export class CategoryComponent implements OnInit {
 // bread crum data
 breadCrumbItems: Array<{}>;
 hideme: boolean[] = [];

 // Table data
//  tableData: Table[];
  CategoryList: Table [];
 tables$: Observable<Table[]>;
 total$: Observable<number>;

 @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;

 constructor(public service: AdvancedService,public catservice: SharedService) {
   this.tables$ = service.tables$;
   this.total$ = service.total$;
 }
 ngOnInit() {

   this.breadCrumbItems = [{ label: 'Master' }, { label: 'Category', active: true }];

   /**
    * fetch data
    */
   this._fetchData();
 }


 changeValue(i) {
   this.hideme[i] = !this.hideme[i];
 }

 /**
  * fetches the table value
  */
//  _fetchData() {
//    this.tableData = tableData;
//    for (let i = 0; i <= this.tableData.length; i++) {
//      this.hideme.push(true);
//    }
   _fetchData() {
     this.catservice.getCatList().subscribe(data => {
       this.CategoryList = data;
     });
   for (let i = 0; i <= this.CategoryList.length; i++) {
     this.hideme.push(true);
   }
   
 }

 /**
  * Sort table data
  * @param param0 sort the column
  *
  */
 onSort({ column, direction }: SortEvent) {
   // resetting other headers
   this.headers.forEach(header => {
     if (header.sortable !== column) {
       header.direction = '';
     }
   });
   this.service.sortColumn = column;
   this.service.sortDirection = direction;
 }
}
