import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  user: User;

  userData: FormGroup;    
  submitmsg;
  breadCrumbItems: Array<{}>;
  allEmployeeList;
  RoleList = [
    { id: 1, 'RoleName': "Admin" },
    { id: 2, 'RoleName': "Super Admin" },
  
  ];
  Status = [
    { id: 1, 'Status': "Active" },
    { id: 2, 'Status': "Disabled" },
  
  ];
  constructor(public http: HttpClient, private router: Router,  public formBuilder: FormBuilder, private route: ActivatedRoute,public userservice: UsersService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Role Configuration' }, { label: 'Update User', active: true }];
    this.userData = this.formBuilder.group({
      UserId: [0, [Validators.required]],
      Role: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      Status: ['Active'],
      EmployeeId: ['', [Validators.required]],
      
      

    });
    this.getAllEmployee();
    this.getUserDetails(this.route.snapshot.paramMap.get('id'));
  }
  getUserDetails(id) {
    this.userservice.getUserDetails(id).subscribe((data) => {
      this.user = data as User;
      console.log(this.user);
      this.userData.controls['UserId'].setValue((data as User).UserId);
      this.userData.controls['Role'].setValue((data as User).Role);
      this.userData.controls['email'].setValue((data as User).email);
      this.userData.controls['password'].setValue((data as User).password);
      this.userData.controls['Status'].setValue((data as User).Status);
      this.userData.controls['EmployeeId'].setValue((data as User).EmployeeId);
      ;
     
      
    });
    
  }
  getAllEmployee() {
    this.http.get('http://127.0.0.1:8000/getEmployeeListName/').subscribe(data => {
      this.allEmployeeList = data as any[];
      console.log(this.allEmployeeList);
    });
  }
  updateData() {
    const formdata = this.userData.value;
    console.log(formdata ['UserId']);
    this.http.put('http://127.0.0.1:8000/getAllUsers/'+formdata ['UserId'], formdata).subscribe(data => {
      console.log(data);
      this.submitmsg = data;
      if (data['message'] == 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: ' User has been successfully created.',
          showConfirmButton: false,
          timer: 1500
        });
      }
      else if (data['message'] == 0) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: ' Username already exists.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
    
  }

}
