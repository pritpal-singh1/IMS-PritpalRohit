import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder,FormControl, Validators, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { stocksData } from './data';
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { StockAdjustments } from './stock-adjustments.model';
import { InventoryService } from '../inventory.service';
import { HttpClient } from '@angular/common/http';



class DataTablesResponse {
	data: any[];
	draw: number;
	recordsFiltered: number;
	recordsTotal: number;
}



@Component({
  selector: 'app-stock-adjustments',
  templateUrl: './stock-adjustments.component.html',
  styleUrls: ['./stock-adjustments.component.scss']
})
export class StockAdjustmentsComponent implements OnInit {
 
  breadCrumbItems: Array<{}>;
  @ViewChild(DataTableDirective, { static: false })
	dtElement: DataTableDirective;

	isDtInitialized: boolean = false;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();
  submitted: boolean;
  modalTitle = "Add Stock Adjustments";
  modalButton="Save"
  stockadjustmentsData: StockAdjustments[];
  stockAdjustmentForm: FormGroup;
  productlist: any[];
  reasons = [
    { id: 1, name: "Stock Takeoff" },
    { id: 3, name: "Product Lost" },
    { id: 4, name: "Product Stolen" },
    { id: 5, name: "Donation" },
    { id: 6, name: "Write-off" },
 
  ];
  types = ['Debit', 'Credit']; 


  constructor(private modalService: NgbModal, private fb: FormBuilder,
    public formBuilder: FormBuilder, private service: InventoryService, public http: HttpClient) {
    
     }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Inventory' }, { label: 'Stock', active: true }];
    this.getAllInvoices();
    this.stockAdjustmentForm = this.formBuilder.group({
      Date: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      Reason: ['', [Validators.required]],
      ProductId: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      Quantity: ['', [Validators.required]],
      Amount: ['', [Validators.required]],
      Remarks: ['', [Validators.required]],
      
    });
    this.getProductList();
  }
  getAllInvoices() {
		this.service.getStockAdjustmentsData().subscribe((data) => {
			this.stockadjustmentsData = data as StockAdjustments[] ;
			console.log(this.stockadjustmentsData);
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

  openModal(content: any) {
    this.modalTitle = "Add Stock Adjustments"
    this.modalButton="Save"
    this.modalService.open(content, { centered: true });
  }
  saveData() {
    const formdata = this.stockAdjustmentForm.value;
    console.log(formdata);
    this.service.saveStockAdjustmentsData(formdata).subscribe(data => {
      console.log(data);
    })
    
  }
  getProductList() {
    this.http.get("http://127.0.0.1:8000/getProductListName/").subscribe(data => {
      this.productlist = data as any[];
      
    })
  }
  editStockAdjustments(content: any, id) {
    this.modalTitle = "Edit Stock Adjustments"
    this.modalButton="Update"
    this.service.getStockAdjustmentById(id).subscribe(data => {
      console.log(data);
      
      this.stockAdjustmentForm.controls['Date'].setValue((data as StockAdjustments).Date);
      this.stockAdjustmentForm.controls['Type'].setValue((data as StockAdjustments).Type);
      this.stockAdjustmentForm.controls['Reason'].setValue((data as StockAdjustments).Reason);
      this.stockAdjustmentForm.controls['ProductId'].setValue((data as StockAdjustments).ProductId);
      this.stockAdjustmentForm.controls['Quantity'].setValue((data as StockAdjustments).Quantity);
      this.stockAdjustmentForm.controls['Amount'].setValue((data as StockAdjustments).Amount);
      this.stockAdjustmentForm.controls['Remarks'].setValue((data as StockAdjustments).Remarks);
    
     
    });
    this.modalService.open(content, { centered: true });
  }

}
