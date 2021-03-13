import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userData: FormGroup;
  submitmsg;
  breadCrumbItems: Array<{}>;
  allEmployeeList;
  constructor(public http: HttpClient,  public formBuilder: FormBuilder) { }
  RoleList = [
    { id: 1, 'RoleName': "Admin" },
    { id: 2, 'RoleName': "Super Admin" },
  
  ];
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Role Configuration' }, { label: 'Add User', active: true }];
    this.userData = this.formBuilder.group({
      UserId: [0, [Validators.required]],
      Role: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      Status: ['Active'],
      EmployeeId: ['', [Validators.required]],
      
      

    });
    this.getAllEmployee();
  }
  getAllEmployee() {
    this.http.get('http://127.0.0.1:8000/getEmployeeListName/').subscribe(data => {
      this.allEmployeeList = data as any[];
      console.log(this.allEmployeeList);
    });
  }
  saveData() {
    const formdata = this.userData.value;
    console.log(formdata);
    this.http.post('http://127.0.0.1:8000/register/', formdata).subscribe(data => {
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
