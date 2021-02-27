import { Component, OnInit } from '@angular/core';
import {companyDetailService} from './company-detail.service';
import {CompanyDetails} from './company-detail.model';
import { from } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  isDisabled = true;
  companyData: CompanyDetails = {
    CompanyId: 0,
    CompanyName: "",
    OwnerName: "",
    GSTIN: "",
    PanNo: "",
    Address: "",
    ZipCode: "",
    Country: "",
    ContactNumber:"",
    EmailId:"",
    
  };
  constructor(private companydetails: companyDetailService) { }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Users" },
      { label: "Add Employee", active: true },
    ]; 
    this.getCompanyData();
    
  }

  getCompanyData() {
    this.companydetails.getCompanyDetails().subscribe(data => {
      this.companyData = data as CompanyDetails;
      console.log(this.companyData);
    });
  }
  updateDetails() {
    this.companydetails.updateCompanyDetails(this.companyData).subscribe(data => {
    
      console.log(data);
      this.changeButtons(); 
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: "Company details has been successfully updated.",
      showConfirmButton: false,
      timer: 1500
    });
  }

  changeButtons() {
    this.isDisabled = !this.isDisabled;
  }
 

}
