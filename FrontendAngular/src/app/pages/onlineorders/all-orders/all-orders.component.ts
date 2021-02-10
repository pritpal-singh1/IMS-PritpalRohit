import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Online Orders' }, { label: 'All Orders', active: true }];

  }

}
