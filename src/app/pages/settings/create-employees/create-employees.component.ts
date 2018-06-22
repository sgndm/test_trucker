import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
	selector: 'app-create-employees',
	templateUrl: './create-employees.component.html',
	styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {

	public access_token = '';

	public company_name: string = '';

	public email: any;
	public employeeName: any;
	public phone: any;
	public userName: any;
	public password: any;

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,

	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {

		this.getCompanyName(this.access_token);

	}

	// get company name
	getCompanyName(token) {
		this.apiServices.getDetailsSetHeader(token).subscribe(
			(res: any) => {
				if (res.status == 'successful') {
					let userType = res.userType;

					switch (userType) {
						case "DUMPUSER":
							this.company_name = res.dumpUser.dumpCompany.companyName;
							break;

						default:
							this.company_name = '';
							break;
					}


				}
			}
		)
	}

	onSaveEmployee() {
		const data = {
			employee: {
				email: this.email,
				name: this.employeeName,
				phoneNumber: this.phone,
				user: {
					username: this.userName,
					password: this.password
				}
			}
		}

		this.apiServices.createEmployee(data, this.access_token).subscribe(
			(res: any) => {
				console.log(res);

				if((res.status == "successful") && (res.message == "account_created")) {
					this.apiServices.altScc("Employee created successfully", this.goToCurrentEmployees());

				}
			},

			err => {
				console.log(err);
			}
		)
	}

	goToCurrentEmployees() {
		this.router.navigate(['/pages/employees']);
	}

}

