import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { CategoryComponent } from './category/category.component';
import { BrandsComponent } from './brands/brands.component';
import { StaffComponent } from './staff/staff.component';
import { TablesRoutingModule } from '../tables/tables-routing.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './shared.service';
import { AddEditCategoryComponent } from './category/add-edit-category/add-edit-category.component';

@NgModule({
  declarations: [MasterComponent, CategoryComponent, BrandsComponent, StaffComponent, AddEditCategoryComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    TablesRoutingModule,
    UiModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    SharedService
  ]
})
export class MasterModule { }
