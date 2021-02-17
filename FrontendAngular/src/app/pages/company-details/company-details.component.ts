import { Component, OnInit } from '@angular/core';
import {companyDetailService} from './company-detail.service';
import {CompanyDetails} from './company-detail.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  isDisabled = true;
  company_details: CompanyDetails;
  companyName = "Dream Plywood";
  ownerName = "Sudhir Singhani";
  companyGST = "2345789";
  companyPAN = "234567";
  companyAddress = "Main Bazar, Madhav nagar, Katni(M.P.).";
  CompanyZIP = "123456";
  country = "India";
  contactNumber = "9827061790";
  emailId = "abc@gmail.com";
  constructor(private companydetails: companyDetailService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Company Details' }, { label: '', active: true }];
     this.companydetails.getCompanyDetails().subscribe(data=>{
      this.company_details = data[0];
      // console.log(data[0]);
    });
    
  }
  updateDetails(){
    console.log('hello');
    this.isDisabled = false;
  }

}
