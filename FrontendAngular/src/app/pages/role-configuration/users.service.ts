import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  readonly APIUrl = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) { }
  getUserList(){
      return this.http.get(this.APIUrl+'/getAllUsers/');
  }
  getUserDetails(id) {
    return this.http.get(this.APIUrl + '/getUserById/' + id);
  }
  // updateUser(formdata){
  //     return this.http.delete(this.APIUrl + '/expense/' + formdata.ExpenseId);
  // }
  deleteUser(id){
      return this.http.delete(this.APIUrl + '/getAllUsers/'+id);
  }
}