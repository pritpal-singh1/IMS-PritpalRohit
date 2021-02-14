import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {AddSupplierComponent} from './add-supplier/add-supplier.component';
import {ManageSupplierComponent} from './manage-supplier/manage-supplier.component';

const routes: Routes = [
    {
        path:'add-supplier', 
        component:AddSupplierComponent
    },
    {
        path:'manage-supplier',
        component:ManageSupplierComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SupplierRoutingModule { }
  