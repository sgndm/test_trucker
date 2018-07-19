import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
	selector: 'app-dupm--complete',
	templateUrl: './dupm--complete.component.html',
	styleUrls: ['./dupm--complete.component.css']
})
export class DupmCompleteComponent implements OnInit {

	public company_name: '';

	public access_token = '';

	public total_loads: any;
	public total_fees: any;

	public job_month: any;
	public job_year: any;
	public years_list : any[];

	public show_month: boolean;

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,
	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {
		this.job_year = 0;
		this.job_month = 0;

		let currentYear = new Date().getFullYear();
		let max = currentYear + 10;
		let min = currentYear - 10;

		let years = [];
		for(let x = min; x <= max; x++) {
			years.push(x);
		}

		this.years_list = years;

		// this.total_fees = 0;
		// get company name
		this.getCompanyName(this.access_token);

		// get history
		this.getCompleteHistory(this.access_token);
	}

	// get company name
	getCompanyName(token) {
		this.apiServices.getDetailsSetHeader(token).subscribe(
			(res: any) => {
				if (res.status == 'successful') {
					let userType = res.userType;

					switch (userType) {
						case "LOADER":
							this.company_name = res.loader.companyName;
							break;

						default:
							this.company_name = '';
							this.apiServices.altErr('You are not Authorized to go to this page', this.apiServices.logOut());
							break;
					}


				}
			}
		)
	}

	// get complete history 
	getCompleteHistory(token) {
		this.apiServices.getCompleteDumpHistory(token).subscribe(
			(res: any) => {
				console.log(res);

				if(res.status == "successful") {
					this.total_loads = res.complete_loads;
					this.total_fees = res.complete_history_dump_fees;
				}
			},
			err => {
				console.log(err);
			}
		)
	}

	// get months
	getMonths() {
		let year = this.job_year;

		if(year == 0) {
			this.show_month = false
		} 
		else {
			this.show_month = true;
			this.job_month = 0;
		}
	}

	// get jobs by month 
	getJobsByMonth() {
		const data = {
			month: this.job_month,
			year: (new Date()).getFullYear()
		}

		this.apiServices.getJobsByMonth(data, this.access_token).subscribe(
			(res: any) => {
				console.log(res);

				if(res.status == "successful") {

				}
			},
			err => {
				console.log(err);
			}
		)
	}
}
