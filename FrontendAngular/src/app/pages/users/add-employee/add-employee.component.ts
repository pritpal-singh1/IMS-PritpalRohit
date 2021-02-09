import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Users' }, { label: 'Add Employee', active: true }];
  }

}
