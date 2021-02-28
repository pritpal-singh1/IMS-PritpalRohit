import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {EmployeeService} from '../employees.service';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  selectValue = [
    {id:1,name:'Admin'},
    {id:2,name:'Employee'},
   ];
  constructor(public employeeservice: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Employees' }, { label: 'Add Employee', active: true }];
    if(!this.employeeservice.formdata){
      this.restForm();
    }

  }
  restForm(form? : NgForm){
    if(form != null)
      form.resetForm();
      this.employeeservice.formdata = {
        EmployeeId:0,
        EmployeeName:'',
        Gender:'',
        Address:'',
        EmailId:'',
        MobileNo:null,
        DOB:'',
        CreatedAt:'',
        ContactPerson:'',
        ContactPersonNo:'',
        AdhaarNo:null,
        JoiningDate:''
      }
  }
  onSubmit(form: NgForm) {
    if(form.value.EmployeeId == 0){
        console.log(form.value);
      this.insertRecord(form); 
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Employee Added',
        showConfirmButton: false,
        timer: 1500
      });
      this.employeeservice.formdata = {
        EmployeeId:0,
        EmployeeName:'',
        Gender:'',
        Address:'',
        EmailId:'',
        MobileNo:0,
        DOB:'',
        CreatedAt:'',
        ContactPerson:'',
        ContactPersonNo:'',
        AdhaarNo:0,
        JoiningDate:''
      }
      this.router.navigate(['/employees/manage-employee']);
    }
    else{
      this.updateRecord(form);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '  Updated',
        showConfirmButton: false,
        timer: 1500
      });
      this.employeeservice.formdata = {
        EmployeeId:0,
        EmployeeName:'',
        Gender:'',
        Address:'',
        EmailId:'',
        MobileNo:0,
        DOB:'',
        CreatedAt:'',
        ContactPerson:'',
        ContactPersonNo:'',
        AdhaarNo:0,
        JoiningDate:''
      }
      this.router.navigate(["/employees/manage-employee"]);
    }
  }
  insertRecord(form: NgForm){
    this.employeeservice.addEmployee(form.value).subscribe(res => {
      this.employeeservice.getEmployeeList();
    });
  }
  updateRecord(form: NgForm){
    this.employeeservice.updateEmployee(form.value).subscribe(res =>{ });
  }

}
