import { Component, OnInit } from '@angular/core';
// import routes
import { Router, ActivatedRoute } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
	selector: 'app-dupm-this-year',
	templateUrl: './dupm-this-year.component.html',
	styleUrls: ['./dupm-this-year.component.css']
})
export class DupmThisYearComponent implements OnInit {

	public access_token = '';
	public company_name: '';

	public total_loads : any;
	public total_fees : any;
	public total_trucks : any;
	public job_month : any;

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,
	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {
		this.job_month = 0;
		
		// get company name
		this.getCompanyName(this.access_token);

		// get history this year 
		this.getDumpHistoryThiYear(this.access_token);
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

	// get dump history for this year
	getDumpHistoryThiYear(token){
		this.apiServices.getDumpHistoryThisYear(token).subscribe(
			(res: any) => {
				console.log(res);

				if(res.status == "successful") {
					this.total_loads = res.loads_this_year;
					this.total_fees = res.total_fees_this_year;
					this.total_trucks = res.trucks_used_this_year;
				}
			},
			err => {
				console.log(err);
			}
		)
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
