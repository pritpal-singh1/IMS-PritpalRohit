import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/core/services/auth.service";
import Swal from "sweetalert2";
import { ProfileDetails } from "./profile.model";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
	isDisabled = true;
	profileData: ProfileDetails = {
		EmployeeId: 0,
		EmployeeName: "",
		EmailId: "",
		Gender: "",
		MobileNo: "",
		Address: "",
		DOB: "",
		ContactPersonNo: "",
		ContactPerson: "",
		AdhaarNo: "",
	};
	genders = ["Male", "Female"];
	constructor(
		private http: HttpClient,
		private authservice: AuthenticationService
	) {}

	ngOnInit(): void {
		this.getProdileData();
	}
	getProdileData() {
		const data = this.authservice.currentUserValue();
		console.log(data);
		this.http
			.get("http://127.0.0.1:8000/getEmployeeById/" + data["EmployeeId"])
			.subscribe((data) => {
				this.profileData = data as ProfileDetails;
				console.log(this.profileData);
			});
	}
	updateProfileData() {
		this.http
			.put(
				"http://127.0.0.1:8000/getEmployeeById/" +
					this.profileData["EmployeeId"],
				this.profileData
			)
			.subscribe((data) => {
				console.log(data);
				this.changeButtons();
			});
		Swal.fire({
			position: "center",
			icon: "success",
			title: "Your profile has been successfully updated.",
			showConfirmButton: false,
			timer: 1500,
		});
	}

	changeButtons() {
		this.isDisabled = !this.isDisabled;
	}
}
