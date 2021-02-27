import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CompanyDetails} from './company-detail.model';

@Injectable({
    providedIn: 'root'
})
export class companyDetailService{
  readonly APIUrl = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) { }

  getCompanyDetails(){
      return this.http.get(this.APIUrl + '/companyDetails/');
  }
  updateCompanyDetails(companydetails: CompanyDetails) {
    console.log(companydetails);
    return this.http.put(this.APIUrl + '/companyDetails/' + companydetails['CompanyId'], companydetails);
  }
}