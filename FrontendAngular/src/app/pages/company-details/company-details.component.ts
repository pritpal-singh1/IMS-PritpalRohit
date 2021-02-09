import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  isDisabled = true;
  companyName = "Dream Plywood";
  ownerName = "Sudhir Singhani";
  companyGST = "2345789";
  companyPAN = "234567";
  companyAddress = "Main Bazar, Madhav nagar, Katni(M.P.).";
  CompanyZIP = "123456";
  country = "India";
  contactNumber = "9827061790";
  emailId = "abc@gmail.com";
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Company Details' }, { label: '', active: true }];

  }

}
