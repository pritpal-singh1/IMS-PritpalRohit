import {
	AfterViewInit,
	Component,
	OnInit,
	OnDestroy,
	ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "../product.model";
import { ProductService } from "../product.service";
import { Subject } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import Swal from "sweetalert2";
import { DataTableDirective } from "angular-datatables";
class DataTablesResponse {
	data: any[];
	draw: number;
	recordsFiltered: number;
	recordsTotal: number;
}

@Component({
	selector: "app-manageproducts",
	templateUrl: "./manageproducts.component.html",
	styleUrls: ["./manageproducts.component.scss"],
})
export class ManageproductsComponent implements OnInit {
	breadCrumbItems: Array<{}>;
	products: Product[] = [];
	@ViewChild(DataTableDirective, { static: false })
	dtElement: DataTableDirective;

	isDtInitialized: boolean = false;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

	constructor(
		private router: Router,
		private http: HttpClient,
		public productservice: ProductService
	) {}
	ngOnInit(): void {
		this.breadCrumbItems = [
			{ label: "Master" },
			{ label: "Manage Products", active: true },
		];
		this.dtOptions = {
			pagingType: "full_numbers",
			pageLength: 10,
		};
		this.getProducts();
	}

	getProducts() {
		this.productservice.getProductList().subscribe((data) => {
			this.products = data;
			console.log(this.products);
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
	addExpense() {
		this.router.navigate(["/master/add-products"]);
	}

	editProduct(product: Product) {
		this.productservice.formData = Object.assign({}, product);
		this.router.navigate(["/master/add-products"]);
	}
	deleteProduct(product: Product) {
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
				this.productservice.deleteProduct(product).subscribe((res) => {
					this.getProducts();
					console.log(product);
				});
				Swal.fire(
					"Deleted!",
					product.ProductName + " has been deleted.",
					"success"
				);
			}
		});
	}
}
