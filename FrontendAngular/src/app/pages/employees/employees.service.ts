import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {Employee} from './employee.model';
@Injectable({
    providedIn: 'root'
})


export class EmployeeService{
    formdata:Employee;
    readonly APIUrl = "http://127.0.0.1:8000";

    constructor(private http: HttpClient) { }
    getEmployeeList(){
        return this.http.get(this.APIUrl+'/employee/');
    }
    addEmployee(formdata: Employee){
        return this.http.post(this.APIUrl + '/employee/',formdata);
    }
    deleteEmployee(formdata){
        return this.http.delete(this.APIUrl + '/employee/' + formdata.EmployeeId);
    }
    updateEmployee(formdata: Employee){
        return this.http.put(this.APIUrl + '/Employee/',formdata);
    }
}