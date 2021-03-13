import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeService} from '../employees.service';
import { Subject } from 'rxjs';
import {Employee} from '../employee.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DataTableDirective } from "angular-datatables";

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent implements OnInit {

  employees: any;
  breadCrumbItems: Array<{}>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  readonly APIUrl = "http://127.0.0.1:8000";
  @ViewChild(DataTableDirective, { static: false })
	dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  // dtOptions: DataTables.Settings = {};
  // persons: Person[];
  constructor(private router:Router, private employeeservice: EmployeeService,private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Employees' }, { label: 'Manage Employee', active: true }];
    this.getEmployees();
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 2,
    //   serverSide: true,
    //   processing: true,
    //   ajax: (dataTablesParameters: any, callback) => {
    //     this.http
    //       .post<DataTablesResponse>(
    //         'https://angular-datatables-demo-server.herokuapp.com/',
    //         dataTablesParameters, {}
    //       ).subscribe(resp => {
    //         this.persons = resp.data;

    //         callback({
    //           recordsTotal: resp.recordsTotal,
    //           recordsFiltered: resp.recordsFiltered,
    //           data: []
    //         });
    //       });
    //   },
    //   columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
    // };
  }
  addEmployee(){
    this.employeeservice.formdata = {
      EmployeeId:0,
      EmployeeName:'',
      Gender:'',
      Address: '',
     
      EmailId:'',
      MobileNo:null,
      DOB:'',
      CreatedAt:'',
      ContactPerson:'',
      ContactPersonNo:'',
      AdhaarNo:null,
      JoiningDate:''
    }
    this.router.navigate(['/employees/add-employee']);
  }
  getEmployees(){
    this.employeeservice.getEmployeeList().subscribe( data => {
      console.log(data);
      this.employees = data;
      if (this.isDtInitialized) {
				this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
					dtInstance.destroy();
					this.dtTrigger.next();
				});
			} else {
				this.isDtInitialized = true;
				this.dtTrigger.next();
			}
   });
  }


  editEmployee(employee: Employee){
    this.employeeservice.formdata = Object.assign({},employee);
    this.router.navigate(['/employees/add-employee']);
  }


  deleteEmployee(employee: Employee){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if(result.value){
        this.employeeservice.deleteEmployee(employee).subscribe(data =>{

          this.getEmployees();
        });
		Swal.fire(
			"Deleted!",
			employee.EmployeeName + " has been deleted.",
			"success"
		);
      }
    });
  }

}
