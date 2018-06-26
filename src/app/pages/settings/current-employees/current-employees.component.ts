import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';
import swal from 'sweetalert2';

@Component({
	selector: 'app-current-employees',
	templateUrl: './current-employees.component.html',
	styleUrls: ['./current-employees.component.css']
})
export class CurrentEmployeesComponent implements OnInit {

	public access_token = '';

	public company_name: string = '';

	public rows: any[];
	public columns: any[];
	public temp: any[];

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

		this.columns = [
			{ name: 'index' },
			{ name: 'emp_name' },
			{ name: 'emp_phone' },
			{ name: 'email' },
			{ name: 'status' }
		];


		this.getCompanyName(this.access_token);

		this.getCurrentEmployees(this.access_token);

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


	getCurrentEmployees(token) {
		this.apiServices.getCurrentEmployees(token).subscribe(
			(res: any) => {
				console.log(res);

				if ((res.status == "successful") && (res.message == "dump_employees")) {
					let tempArray = [];

					// bind data to table 
					let i = 0;
					for (let data of res.dump_employees) {
						i += 1;
						let tempRow = {
							index: i,
							emp_name: data.name,
							emp_id: data.id,
							emp_phone: data.phoneNumber,
							email: data.email,
							status: data.dumpUserStatus
						}

						tempArray.push(tempRow);
					}

					this.rows = tempArray;
					this.temp = this.rows;
				}


			},

			err => {
				console.log(err);
			}
		)
	}

	updateFilter(event) {}

	onPutHoldCustomer(id) {

		const data = { u_id: id}

		this.apiServices.onHoldEmployee(data, this.access_token).subscribe(
			(res: any) => {
				console.log(res);

				if((res.status == "successful") && (res.message == "dump_employee_blocked")) {
					this.apiServices.altScc('Employee Blocked Successfully', this.getCurrentEmployees(this.access_token));
				}
			},

			err => {
				console.log(err)
			}
		)

	}

	onActivateCustomer(id) {

		const data = { u_id: id}

		this.apiServices.onActivateEmployee(data, this.access_token).subscribe(
			(res: any) => {
				console.log(res);

				if((res.status == "successful") && (res.message == "dump_employee_unblocked")) {
					this.apiServices.altScc('Employee Activated Successfully', this.getCurrentEmployees(this.access_token));
				}
			},

			err => {
				console.log(err)
			}
		)

	}

	onDeleteCustomer(id) {
		
		const data = { u_id: id}

		this.apiServices.deleteEmployee(data, this.access_token).subscribe(
			(res: any) => {
				console.log(res);

				if((res.status == "successful") && (res.message == "dump_employee_deleted")) {
					this.apiServices.altScc('Employee Deleted Successfully', this.getCurrentEmployees(this.access_token));
				}
			},

			err => {
				console.log(err)
			}
		)

	}

	

}
