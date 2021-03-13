import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  cnfpassword: string;
  isSame: boolean=false ;
  error: string;
  constructor(private authservice: AuthenticationService,private http : HttpClient) { }
  resetpassword:any = {
    oldpassword: '',
    password:'',
  }
  ngOnInit(): void {

    
  }
  reset() {
    this.resetpassword = {
      oldpassword: '',
      password:'',
    }
    this.cnfpassword = '';
    
  }
  submit() {
    if (this.cnfpassword === this.resetpassword.password) {
      this.isSame = true;
    }
    else {
      this.isSame = false;
      this.error = "Password doesn't match."
      this.reset();
    }
    if (this.isSame) {
      this.http.put('http://127.0.0.1:8000/changepassword/' + this.authservice.currentUserValue()['UserId'], this.resetpassword).subscribe(
        data => {
      
          if (data['message'] == 0) {

            this.error = "Old password is incorrect."
      
            this.reset();
          }
          else {
            this.error = "";
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Password has been changed.',
              
            });
            this.reset();
          }
        }
      );
    }
  
  }
  




}
