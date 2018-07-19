import { Component, OnInit } from '@angular/core';
// import routes
import { Router, ActivatedRoute } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
	selector: 'app-company-this-week',
	templateUrl: './company-this-week.component.html',
	styleUrls: ['./company-this-week.component.css']
})
export class CompanyThisWeekComponent implements OnInit {


	public company_name: '';
	public dump_site_name: '';

	public access_token = '';

	public total_loads : any;
	public total_fees : any;

	public rows: any[];
    public columns: any[];
    public temp: any[];


	constructor(
		private activeRoute: ActivatedRoute,
		public router: Router,
		private apiServices: ApiServicesService,
	) {
		this.activeRoute.params.subscribe(
			params => {
				this.dump_site_name = params.name;
				console.log(params);
			}

		);

		this.access_token = localStorage.getItem('access_token')

	}

	ngOnInit() {

		this.columns = [
            { name: 'index' },
            { name: 'job_name' },
            { name: 'job_number' },
            { name: 'job_status' },
            { name: 'date' },
            { name: 'action' },
        ];

		// this.total_fees = 0;
		// get company name
		this.getCompanyName(this.access_token);

		this.getDumpHistoryThisWeekByCompany(this.dump_site_name, this.access_token);
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

	// get dump history this week 
	getDumpHistoryThisWeekByCompany(company_name, token) {
		this.apiServices.getDumpHistoryByCompanyName(company_name, token).subscribe(
			(res: any) => {
				console.log(res);

				if(res.status == "successful") {
					this.total_loads = res.loads_count_for_dump_this_week;
					this.total_fees = res.dump_fees_this_week;
				}
			},
			err => {
				console.log(err);
			}
		)
	}

}
