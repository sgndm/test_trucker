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

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,
	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {
		this.total_fees = 0;
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
				}
			},
			err => {
				console.log(err);
			}
		)
	}

}
