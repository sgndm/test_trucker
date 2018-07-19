import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';
import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
	selector: 'app-loader-dashboard',
	templateUrl: './loader-dashboard.component.html',
	styleUrls: ['./loader-dashboard.component.css']
})

export class LoaderDashboardComponent implements OnInit {

	public access_token = '';

	public company_name: string = '';
	public total_loads: any;
	public total_fees: any = '';

	public loads_dump_site = [];

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,

	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {

		// this.total_fees = 0;
		// this.total_loads = 0;

		// get company name
		this.getCompanyName(this.access_token);
		// get dump stats this week
		this.getThisWeekLoads(this.access_token);
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

	getThisWeekLoads(token) {
		this.apiServices.getDumpHistoryThisWeek(token).subscribe(
			(res: any) => {
				console.log(res);

				if(res.status == "successful") {
					this.total_loads = res.loads_this_week;
					this.total_fees = res.dump_fees_this_year;

					let temp = res.loads_this_week_by_dump;
					
					let t_arr = [];
					for(let key in temp) {

						let arr = {'company': key, 'loads': temp[key] };
						t_arr.push(arr);
						
					}
					this.loads_dump_site = t_arr;
					console.log(this.loads_dump_site);
				}
			},
			err => {
				console.log(err);
			}
		)
	}

}
