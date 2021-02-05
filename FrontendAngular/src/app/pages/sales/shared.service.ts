import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://127.0.0.1:8000";
  constructor(private http:HttpClient) { }
  getCatList(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/category/');
  }
}