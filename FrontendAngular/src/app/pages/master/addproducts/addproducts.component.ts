import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product.service';
import { FormsModule,
  NgForm, FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.scss']
})
export class AddproductsComponent implements OnInit {

  AllCategory: any[];
  AllBrands: any[];
  // breadcrumb items
  breadCrumbItems: Array<{}>;

  form: FormGroup;
  constructor(public productservice: ProductService, public router: Router, public httpClient: HttpClient, private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Add Product', active: true }];
    this.resetForm();
    console.log(this.productservice.formData);
    this.getCategories();
    this.getBrands();

    

  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

  }
  getCategories() {
    this.httpClient.get("http://127.0.0.1:8000/category/").subscribe(
      data => {
        this.AllCategory = data as any;

      });
  }
  getBrands() {
    this.httpClient.get("http://127.0.0.1:8000/brand/").subscribe(
      data => {
        this.AllBrands = data as any;

      });
  }
  onSubmit(form: NgForm) {
    if (form.value.ProductId == 0) {
      this.insertRecord(form);

      console.log("proimahe " + this.productservice.formData.ProductImage);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: form.value.ProductName + ' Added',
        showConfirmButton: false,
        timer: 1500
      });
      this.productservice.formData = {
        ProductId: 0,
        ProductName: '',
        Brand: '',
        Category: '',
        ItemCode: '',
        ProductImage: '',
        PrintName: '',
        PurchasePrice: '',
        SalePrice: '',
        MRP: '',
        LowLevelLimit: '',
        Discount: '',
        GST: '',
        StockQTY: '',

      }
      this.router.navigate(["/master/manage-products"]);

    }
    else {
      this.updateRecord(form);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '  Updated',
        showConfirmButton: false,
        timer: 1500
      });
      this.productservice.formData = {
        ProductId: 0,
        ProductName: '',
        Brand: '',
        Category: '',
        ItemCode: '',
        ProductImage: '',
        PrintName: '',
        PurchasePrice: '',
        SalePrice: '',
        MRP: '',
        LowLevelLimit: '',
        Discount: '',
        GST: '',
        StockQTY: '',

      }
      this.router.navigate(["/master/manage-products"]);
    }


  }
  insertRecord(form: NgForm) {

    this.productservice.addProduct(form.value).subscribe(res => {
      console.log(res.toString);
    });
  }
  updateRecord(form: NgForm) {
    this.productservice.updateProduct(form.value).subscribe(res => {


    });
  }
  onFileChanged(event) {
    var file = event.target.files[0];
    const formdata: FormData = new FormData();
    formdata.append('uploadedFile', file, file.name);

    this.productservice.uploadPhoto(formdata).subscribe(data => {

      this.productservice.formData.ProductImage = this.productservice.PhotoUrl + data.toString();
      console.log("pro image " + this.productservice.formData.ProductImage);
    });
    console.log(file);
  }


}

