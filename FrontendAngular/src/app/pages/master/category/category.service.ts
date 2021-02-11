import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  formData  : Category;
  list: Category[];
  CategoryFilter: string = "";
  listwithoutfilter: Category[];
  readonly APIUrl = "http://127.0.0.1:8000";
  constructor(private http: HttpClient) { }

  getCategoryList(){
    this.http.get(this.APIUrl + '/category/').subscribe(data => {
      this.list = data as Category[];
      this.listwithoutfilter = data as Category[];
    });
   
  }
 

  addCategory(formData:Category){
    return this.http.post(this.APIUrl + '/category/', formData);
    
  }
  updateCategory(formData: any) {
    console.log(formData);
    return this.http.put(this.APIUrl + '/category/', formData);
    
  }
  deleteCategory(formData){
    return this.http.delete(this.APIUrl + '/category/'+formData.CategoryId);
  }
}
