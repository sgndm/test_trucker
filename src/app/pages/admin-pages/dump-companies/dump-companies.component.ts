import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
	selector: 'app-dump-companies',
	templateUrl: './dump-companies.component.html',
	styleUrls: ['./dump-companies.component.css']
})
export class DumpCompaniesComponent implements OnInit {

	public access_token = '';

	public rows: any[];
	public columns: any[];
	public temp: any[];

	public company_id: '';


	constructor(
		public router: Router,
		private apiServices: ApiServicesService,

	) {
		this.access_token = localStorage.getItem('access_token')
	}

	// on init
	ngOnInit() {

		// get details
		this.getUserDetails(this.access_token);

		// get dump company details
		this.getDetailsAndCreatTable();

	}

	// get user details 
	getUserDetails(token) {
		this.apiServices.getDetailsSetHeader(token).subscribe(
			(res: any) => {
				if (res.status == 'successful') {
					let userType = res.userType;

					switch (userType) {
						case "WEBADMIN":
							break;

						default:
							this.apiServices.altErr('You are not Authorized to go to this page', this.apiServices.logOut());
							break;
					}


				}
			}
		)
	}


	// approve sump company
	onApprove(id) {
		const data = {
			companyId: id
		}

		this.apiServices.approveDumpCompany(data, this.access_token).subscribe(
			(res: any) => {
				console.log(res);
				if ((res.status == "successful") && (res.message == "account_approved")) {

					this.apiServices.altScc('Successfully approved', this.getDetailsAndCreatTable());
				}
			},

			err => {
				console.log(err);
			}
		)
	}

	// block company 
	onBlockCompany(id) {
		const data = {
			companyId: id
		}

		this.apiServices.blockDumpCompany(data, this.access_token).subscribe(
			(res: any) => {
				console.log(res);
				if ((res.status == "successful") && (res.message == "account_blocked")) {

					this.apiServices.altScc('Successfully blocked', this.getDetailsAndCreatTable());

				}
			},

			err => {
				console.log(err);
			}
		)
	}

	onUnblockCompany(id) {
		const data = {
			companyId: id
		}

		this.apiServices.approveDumpCompany(data, this.access_token).subscribe(
			(res: any) => {
				console.log(res);
				if ((res.status == "successful") && (res.message == "account_approved")) {

					this.apiServices.altScc('Successfully approved', this.getDetailsAndCreatTable());
				}
			},

			err => {
				console.log(err);
			}
		)
	}

	getDetailsAndCreatTable() {
		this.apiServices.getDumpCompanies(this.access_token).subscribe(
			(res: any) => {
				console.log("\n\n dump companies");
				console.log(res);

				let tempArray = [];

				// bind data to table 
				let i = 0;
				for (let data of res.dump_accounts) {
					i += 1;
					let tempRow = {
						index: i,
						comp_name: data.dumpCompany.companyName,
						comp_id: data.id,
						user_name: data.name,
						email: data.email,
						status: data.dumpUserStatus
					}

					tempArray.push(tempRow);
				}

				this.rows = tempArray;
				this.temp = this.rows;

				this.columns = [
					{ name: 'index' },
					{ name: 'comp_name' },
					{ name: 'user_name' },
					{ name: 'email' },
					{ name: 'status' },
					{ name: 'action' },
				];

			},

			err => {
				console.log(err);
			}
		)
	}

	updateFilter(event) {
		const val = event.target.value.toLowerCase();

		// filter our data
		const temp_data = this.temp.filter(function (d) {
			return d.comp_name.toLowerCase().indexOf(val) !== -1 || !val;
		});

		// update the rows
		this.rows = temp_data;
	}


}
