import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from "angular-datatables";
import { UsersService } from '../users.service';
import { User } from '../user.model';
import Swal from 'sweetalert2';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  usersArray: User[];
  breadCrumbItems: Array<{}>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  readonly APIUrl = "http://127.0.0.1:8000";
  @ViewChild(DataTableDirective, { static: false })
	dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  constructor(private router:Router,private userservice: UsersService, private userservie: UsersService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Role Configuration' }, { label: 'Manage User', active: true }];
    this.getUsers();
  }
  addUser(){
    this.router.navigate(['/role-configuration/add-user']);
  }
  getUsers(){
    this.userservie.getUserList().subscribe( data => {
      
      console.log(data);
      this.usersArray = data as User[];
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
  deleteData(id) {
    Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#34c38f",
			cancelButtonColor: "#ff3d60",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.value) {
        this.userservice.deleteUser(id).subscribe(data => {
          console.log(data);
          this.getUsers();
          
        })
				Swal.fire(
					"Deleted!",
				
					"success"
				);
			}
		});

  }
}

