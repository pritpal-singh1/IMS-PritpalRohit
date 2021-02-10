import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Role Configuration' }, { label: 'Manage User', active: true }];

  }
  addUser(){
    this.router.navigate(['/role-configuration/add-user']);
  }

}
