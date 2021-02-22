import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {Supplier} from './master.model';

@Injectable({
    providedIn: 'root'
})

export class SupplierService{
    formdata: Supplier;
    list: Supplier[];
    listwithoutfilter: Supplier[];
    readonly APIUrl = "http://127.0.0.1:8000";

    constructor(private http: HttpClient) { }
    getSupplierList(){
        return this.http.get(this.APIUrl+'/supplier/');
        // .subscribe(data=>{
        //     this.list = data as Supplier[];
        //     this.listwithoutfilter = data as Supplier[];
            
        // });
        // return this.list;
    }
    addSupplier(formdata: Supplier){
        return this.http.post(this.APIUrl + '/supplier/', formdata);
    }
    deleteSupplier(formdata){
        return this.http.delete(this.APIUrl + '/supplier/'+formdata.SupplierId);
    }
    updateSupplier(formdata: Supplier){
        return this.http.put(this.APIUrl + '/supplier/', formdata );
    }
}



