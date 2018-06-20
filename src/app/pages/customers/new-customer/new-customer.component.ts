import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
	selector: 'app-new-customer',
	templateUrl: './new-customer.component.html',
	styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

	public access_token = '';
	public company_name: string = '';

	public customerName: '';
	public email: '';
	public password: '';
	public phone: '';
	public city: '';
	public street: '';
	public streetAddress: '';
	public state: '';
	public zipcode: '';
	public ssnEin: '';

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,

	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {
		
		this.getCompanyName(this.access_token);

		this.customerName = '';
		this.email = '';
		this.password = '';
		this.phone = '';
		this.city = '';
		this.street = '';
		this.streetAddress = '';
		this.state = '';
		this.zipcode = '';
		this.ssnEin = '';

	}

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
	
	onSaveCustomer(){
		const data = {
			dump_customer: {
				"name": this.customerName,
				"email": this.email,
				"password": this.password,
				"phoneNumber": this.phone,
				"state": this.state,
				"city": this.city,
				"street": this.street,
				"streetAddress": this.streetAddress,
				"zipcode": this.zipcode,
				"ssnEin": this.ssnEin
			}
		}

		this.apiServices.createCustomer(data, this.access_token).subscribe(
			(res:any) => {
				console.log(res);

				if((res.status == "successful") && (res.message == "customer_created")) {
					alert("Customer Created Successfully");
					this.goToCurrentCustomer();
				} 

				// if((res.status == "successful") && (res.message == "no_loader_account_associated_with_this_email")) {
				// 	alert("please use a loader email")
				// } 

			}, 
			err => {
				console.log(err);
			}
		)

	}


	goToCurrentCustomer() {
        this.router.navigate(['/pages/customers/current']);
    }

}
