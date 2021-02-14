import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from './brands.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  formData  : Brand;
  list: Brand[];
  readonly APIUrl = "http://127.0.0.1:8000";
  constructor(private http: HttpClient) { }

  getBrandList(){
    this.http.get(this.APIUrl + '/brand/').subscribe(data => {
      this.list = data as Brand[];
    });
   
  }
 

  addBrand(formData:Brand){
    return this.http.post(this.APIUrl + '/brand/', formData);
    
  }
  updateBrand(formData: any) {
    console.log(formData);
    return this.http.put(this.APIUrl + '/brand/', formData);
    
  }
  deleteBrand(formData){
    return this.http.delete(this.APIUrl + '/brand/'+formData.BrandId);
  }
}
