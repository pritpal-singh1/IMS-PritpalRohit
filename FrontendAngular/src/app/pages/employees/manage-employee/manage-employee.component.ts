import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Employees' }, { label: 'Manage Employee', active: true }];

  }
  addEmployee(){
    this.router.navigate(['/employees/add-employee']);
  }

}
