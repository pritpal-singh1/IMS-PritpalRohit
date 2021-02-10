import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoryComponent } from './category/category.component';
import { ManageproductsComponent } from './manageproducts/manageproducts.component';
import { StaffComponent } from './staff/staff.component';



const routes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'brand', component: BrandsComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'add-products', component: AddproductsComponent },
  { path: 'manage-products', component: ManageproductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
