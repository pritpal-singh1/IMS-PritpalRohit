import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { SharedService } from '../shared.service';
import { Brand } from './brands.model';
import { BrandsService } from './brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
// bread crum data
BrandList: any = [];

constructor(public brandservice: BrandsService) { }

 ngOnInit(): void {
 
   this.refreshBrandList();
  
 }


 refreshBrandList() {
   this.brandservice.getBrandList();
  
   
 }
 editBrand(brand: Brand) {
   this.brandservice.formData = Object.assign({}, brand);
 }
 deleteBrand(brand: Brand) {
 
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
       this.brandservice.deleteBrand(brand).subscribe(res => {
     
         this.refreshBrandList();
         console.log(brand);
       });
       Swal.fire('Deleted!', brand.BrandName +' has been deleted.', 'success');
     }
   });
 }
}
