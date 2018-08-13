import { Component, OnInit } from '@angular/core';
// import routes
import { Router, ActivatedRoute } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
	selector: 'app-company',
	templateUrl: './company.component.html',
	styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

	public company_id: any;

	public access_token = '';
	
	public company_name: '';
	public comp_st_add: '';
	public comp_city: '';
	public comp_state: '';
	public comp_country: '';
	public comp_zip: '';
	public dump_site_name: '';
	public dump_st_add: '';
	public dump_city: '';
	public dump_country: '';
	public dump_zip: '';
	public dump_phone: '';
	public user_name: '';
	public user_email: '';
	public user_phone: '';
	public username: '';
	public dump_account_sites : any[]

	constructor(
		private activeRoute: ActivatedRoute,
		public router: Router,
		private apiServices: ApiServicesService,
	) {
		this.activeRoute.params.subscribe(
			params => {
				this.company_id = params.id;
				console.log(params);
			}

		);

		this.access_token = localStorage.getItem('access_token')

	}

	ngOnInit() {

		this.getUserDetails(this.access_token);
		
		this.getCompanyDetails(this.company_id, this.access_token);
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

	getCompanyDetails(id, token) {
		this.apiServices.getCompanyDetailsById(id, token).subscribe(
			(res: any) => {
				console.log("\n\n details\n");
                console.log(res);
                if ((res.status == "successful") && (res.message == "dump_account_details")) {
					let details = res.dump_account;
					
					this.company_name = details.dumpCompany.companyName;
					this.comp_st_add = details.dumpCompany.street;
				
					this.comp_city = details.dumpCompany.city;
					this.comp_state = details.dumpCompany.state;
					this.comp_country = details.dumpCompany.county;
					this.comp_zip = details.dumpCompany.zipcode;

					this.dump_account_sites = res.dump_account_sites;

					// this.dump_site_name = details.dumpSite.siteName;
					// this.dump_st_add = details.dumpSite.street;
					// this.dump_city = details.dumpSite.city;
					// this.dump_country = details.dumpSite.county;
					// this.dump_zip = details.dumpSite.zipcode;
					// this.dump_phone = details.dumpSite.phoneNumber;


					this.user_name = details.name;
					this.user_email = details.email;
					this.user_phone = details.phoneNumber;
					this.username = details.user.username;
                }
            },
            err => {
                console.log(err);
            }
		)
	}

}
