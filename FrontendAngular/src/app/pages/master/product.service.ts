import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  formData  : Product;
  list: Product[];
  readonly APIUrl = "http://127.0.0.1:8000";
  constructor(private http: HttpClient) { }

  getProductList(){
    return this.http.get<Product[]>(this.APIUrl + '/product/');
      
    //   .subscribe(data => {
    //   this.list = data as Product[];
    // });
   
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
}
