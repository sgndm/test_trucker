import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../services/api-services/api-services.service';

@Component({
	selector: 'app-create-trucker',
	templateUrl: './create-trucker.component.html',
	styleUrls: ['./create-trucker.component.css']
})
export class CreateTruckerComponent implements OnInit {

	public truckerName: any;
	public truckerEmail: any;
	public truckerPhone: any;
	public TruckerCompany: any;
	public truckType: any;
	public licenseNumber: any;
	public userName : any;
	public password: any;

	public truck_types_list: any[];

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,
	) { }

	ngOnInit() {

		this.truckType = 0;

		this.apiServices.getTruckTypesSignUp().subscribe(
			(res: any) => {
				console.log(res);
				if((res.status == "successful") && (res.message == "truck_types")) {
					this.truck_types_list = res.truck_types;
				}
			},
			err =>{
				console.log(err);
			}
		)
	}

	onSaveTrucker() {


		let details = {
			name: this.truckerName,
			email: this.truckerEmail,
			phoneNumber: this.truckerPhone,
			company: this.TruckerCompany,
			licenseNumber: this.licenseNumber,
			user: {
				username: this.userName,
				password: this.password
			}
		}

		const data = {
			user: details,
			truckType: this.truckType
		};

		console.log(data);

		this.apiServices.signUpTrucker(data).subscribe(
			(res: any) => {
				console.log(res);

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
