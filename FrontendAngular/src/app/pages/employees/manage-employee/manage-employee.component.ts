import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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

  breadCrumbItems: Array<{}>;
  // dtOptions: DataTables.Settings = {};
  // persons: Person[];
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Employees' }, { label: 'Manage Employee', active: true }];
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
    this.router.navigate(['/employees/add-employee']);
  }

}
