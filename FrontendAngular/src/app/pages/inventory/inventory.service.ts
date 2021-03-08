import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockAdjustments } from './stock-adjustments/stock-adjustments.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  readonly APIUrl = "http://127.0.0.1:8000";
  constructor(private http: HttpClient) { }

  getSearchedData(queries: any[]): Observable<any[]> {
   
    return this.http.post<any[]>(this.APIUrl + '/stockdata/',queries);
    
  }
  getLowLevelLimit(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/lowlevellimit/');
    
  }
  getStockAdjustmentsData(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/stockadjustment/');
  }
  saveStockAdjustmentsData(formdata:StockAdjustments) {
    return this.http.post(this.APIUrl + '/stockadjustment/',formdata);
  }
  updateStockAdjustmentsData(formdata:StockAdjustments){
    return this.http.put(this.APIUrl + '/stockadjustment/'+formdata.StockAdjustmentsId,formdata);
  }
  deleteStockAdjustmentsData(id){
    return this.http.delete(this.APIUrl + '/stockadjustment/'+id);
  }
  getStockAdjustmentById(id:any){
    return this.http.get(this.APIUrl+'/stockadjusmentsbyid/'+id);
    
  }

}
