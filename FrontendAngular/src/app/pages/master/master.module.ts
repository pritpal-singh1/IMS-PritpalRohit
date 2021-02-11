import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { CategoryComponent } from './category/category.component';

import { BrandsComponent } from './brands/brands.component';
import { StaffComponent } from './staff/staff.component';
import { TablesRoutingModule } from '../tables/tables-routing.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { NgbAccordionModule, NgbCollapseModule, NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './shared.service';
import { AddEditCategoryComponent } from './category/add-edit-category/add-edit-category.component';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { ManageproductsComponent } from './manageproducts/manageproducts.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ArchwizardModule } from 'angular-archwizard';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng5SliderModule } from 'ng5-slider';
import { AddEditBrandComponent } from './brands/add-edit-brand/add-edit-brand.component';




@NgModule({
  declarations: [MasterComponent, CategoryComponent, BrandsComponent, StaffComponent, AddEditCategoryComponent, AddproductsComponent, ManageproductsComponent, AddEditBrandComponent],
  imports: [
    CommonModule,
    
    DataTablesModule,
    MasterRoutingModule,
    TablesRoutingModule,
    DropzoneModule,
    UiModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DropzoneModule,
    ReactiveFormsModule,
    UiModule,
    ArchwizardModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTooltipModule,
    NgbCollapseModule,
    Ng5SliderModule,
    NgbModalModule,

  ],
  providers: [
    SharedService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [CategoryComponent],
})
export class MasterModule { }
