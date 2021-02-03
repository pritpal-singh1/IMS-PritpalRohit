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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MasterComponent, CategoryComponent, BrandsComponent, StaffComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    TablesRoutingModule,
    UiModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    
  ]
})
export class MasterModule { }
