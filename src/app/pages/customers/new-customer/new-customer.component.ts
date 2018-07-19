import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
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

	myForm: FormGroup;

	customerName: FormControl;
	email: FormControl;
	password: FormControl;
	phone: FormControl;
	city: FormControl;
	street: FormControl;
	streetAddress: FormControl;
	state: FormControl;
	zipcode: FormControl;
	ssnEin: FormControl;

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,

	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {
		this.createFormControls();
		this.createForm();
		this.getCompanyName(this.access_token);
	}

	createFormControls() {
		this.customerName = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.phone = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.city = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.street = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.streetAddress = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.state = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.zipcode = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.ssnEin = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.email = new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]);
		this.password = new FormControl('', [Validators.required, Validators.minLength(1)]);
	}

	createForm() {
		this.myForm = new FormGroup({
			customerName: this.customerName,
			phone: this.phone,
			city: this.city,
			street: this.street,
			streetAddress: this.streetAddress,
			state: this.state,
			zipcode: this.zipcode,

			ssnEin: this.ssnEin,
			email: this.email,
			password: this.password,
		});
	}

	validateAllFormFields(formGroup: FormGroup) {

		Object.keys(formGroup.controls).forEach(field => {

			const control = formGroup.get(field);

			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			}
			else if (control instanceof FormGroup) {
				this.validateAllFormFields(control);
			}

		});

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
							this.apiServices.altErr('You are not Authorized to go to this page', this.apiServices.logOut());
							break;
					}


				}
			}
		)
	}

	onSaveCustomer() {

		if (this.myForm.valid) {
			const data = {
				dump_customer: {
					"name": this.myForm.value.customerName,
					"email": this.myForm.value.email,
					"password": this.myForm.value.password,
					"phoneNumber": this.myForm.value.phone,
					"state": this.myForm.value.state,
					"city": this.myForm.value.city,
					"street": this.myForm.value.street,
					"streetAddress": this.myForm.value.streetAddress,
					"zipcode": this.myForm.value.zipcode,
					"ssnEin": this.myForm.value.ssnEin
				}
			}

			this.apiServices.createCustomer(data, this.access_token).subscribe(
				(res: any) => {
					console.log(res);

					if ((res.status == "successful") && (res.message == "customer_created")) {
						this.apiServices.altScc('Customer Created Successfully', this.goToCurrentCustomer());

					}
					else if ((res.status == "successful") && (res.message == "no_loader_account_associated_with_this_email")) {
						this.apiServices.altErr('Please Enter a Existing Loader Email', '');
					}

				},
				err => {
					console.log(err);
				}
			)
		}
		else {
			this.validateAllFormFields(this.myForm);
		}


	}


	goToCurrentCustomer() {
		this.router.navigate(['/pages/customers/current']);
	}

}
