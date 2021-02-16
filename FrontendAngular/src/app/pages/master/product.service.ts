import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  formData  : Product= {
    ProductId: 0,
    ProductName: '',
    Brand: '',
    Category: '',
    ItemCode: '',
    ProductImage :'',
    PrintName :'',
    PurchasePrice: '',
    SalePrice :'',
    MRP :'',
    LowLevelLimit :'',
    Discount: '',
    GST :'',
    StockQTY: '',
    
  };
  list: Product[];
  readonly APIUrl = "http://127.0.0.1:8000";
  readonly PhotoUrl = "http://127.0.0.1:8000/media/";
  constructor(private http: HttpClient) { }
  
  getProductList(){
    return this.http.get<Product[]>(this.APIUrl + '/product/');
   
  }
  
 

  addProduct(formData:Product){
    return this.http.post(this.APIUrl + '/product/', formData);
    
  }
  updateProduct(formData: any) {
    console.log(formData);
    return this.http.put(this.APIUrl + '/product/', formData);
    
  }
  deleteProduct(formData){
    return this.http.delete(this.APIUrl + '/product/'+formData.ProductId);
  }

  uploadPhoto(val: any) {
    return this.http.post(this.APIUrl + '/SaveFile', val);
  }
}
