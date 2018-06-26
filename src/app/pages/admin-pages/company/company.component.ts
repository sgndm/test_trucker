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
		this.getCompanyDetails(this.company_id, this.access_token);
	}

	getCompanyDetails(id, token) {
		this.apiServices.getCompanyDetailsById(id, token).subscribe(
			(res: any) => {
				console.log("\n\n details\n");
                console.log(res);
                if ((res.status == "successful") && (res.message == "dump_account_details")) {
					let details = res.dump_account;
					
					this.company_name = details.dumpCompany.companyName;
					this.comp_st_add = details.dumpCompany.streetDetails;
					this.comp_city = details.dumpCompany.city;
					this.comp_country = details.dumpCompany.county;
					this.comp_zip = details.dumpCompany.zipcode;
					// this.dump_site_name = details.dumpCompany.companyName;
					// this.dump_st_add = details.dumpCompany.companyName;
					// this.dump_city = details.dumpCompany.companyName;
					// this.dump_country = details.dumpCompany.companyName;
					// this.dump_zip = details.dumpCompany.companyName;
					// this.dump_phone = details.dumpCompany.companyName;
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
