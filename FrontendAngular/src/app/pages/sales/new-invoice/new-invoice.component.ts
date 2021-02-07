import { Component, OnInit, ViewChild, EventEmitter, Output, Input, NgModule } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent{
   
  breadCrumbItems: Array<{}>;
  selectValue = [
    {id:1,name:'Cash'},
    {id:2,name:'Cheque'},
    {id:3,name:'Card Payment'},
    {id:4,name:'Wallet'}
   ];
  constructor() { 
    
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Users' }, { label: 'Add Employee', active: true }];
  }

}
