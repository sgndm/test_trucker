import { Component, OnInit } from '@angular/core';

// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../services/api-services/api-services.service';


@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

	public compName: '';
	public compStrAddress: '';
	public compCountry: '';
	public compCity: '';
	public compZipCode: '';
	public compLatitude: '';
	public compLongitude: '';

	public dumpSiteName: '';
	public dumpStrAddress: '';
	public dumpStrDetails: '';
	public dumpCity: '';
	public dumpZipCode: '';
	public dumpLatitude: '';
	public dumpLongitude: '';
	public dumpSitePhone: '';


	public dumpuserName: '';
	public email: '';
	public userPhone: '';
	public userName: '';
	public password: '';

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,
	) { }

	ngOnInit() {
	}

	onSignUp() {
		const data = {
			dupmCompany: {
				"companyName": this.compName,
				"city": this.compCity,
				"stree": this.compStrAddress,
				"county": this.compCountry,
				"zipCode": this.compZipCode,
				"longitude": this.compLatitude,
				"latitude": this.compLongitude
			},
			dumpSite: [
				{
					"name": this.dumpSiteName,
					"latitude": this.dumpLatitude,
					"longitude": this.dumpLongitude,
					"city": this.dumpCity,
					"phone": this.dumpSitePhone,
					"zipCode": this.dumpZipCode,
					"street": this.dumpStrAddress,
					"streetDetails": this.dumpStrDetails
				}
			],
			dumpUser: {
				"name": this.dumpuserName,
				"email": this.email,
				"phoneNumber": this.userPhone,
				"user": {
					"username": this.userName,
					"password": this.password
				}
			}
		}

		console.log(data);

		// call server 
		this.apiServices.signUp(data).subscribe(
			(res: any) => {
				if(res.status == "successful") {
					this.apiServices.altScc('successfully created a dump site', this.goToLogin());
				}
			},

			err => {
				console.log(err);
			}
		)


	}

	goToLogin() {
		this.router.navigate(['/sign-in']);
	}

}
