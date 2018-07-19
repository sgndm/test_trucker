import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
	selector: 'app-create-employees',
	templateUrl: './create-employees.component.html',
	styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {

	public access_token = '';

	public company_name: string = '';

	myForm: FormGroup;

	 email: FormControl;
	 employeeName: FormControl;
	 phone: FormControl;
	 userName: FormControl;
	 password: FormControl;

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
		this.employeeName = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.phone = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.userName = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.email = new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]);
		this.password = new FormControl('', [Validators.required, Validators.minLength(1)]);
	}

	createForm() {
		this.myForm = new FormGroup({
			employeeName: this.employeeName,
			phone: this.phone,
			userName: this.userName,
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


	// get company name
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

	onSaveEmployee() {

		if(this.myForm.valid) {
			const data = {
				employee: {
					email: this.myForm.value.email,
					name: this.myForm.value.employeeName,
					phoneNumber: this.myForm.value.phone,
					user: {
						username: this.myForm.value.userName,
						password: this.myForm.value.password
					}
				}
			}
	
			this.apiServices.createEmployee(data, this.access_token).subscribe(
				(res: any) => {
					console.log(res);
	
					if((res.status == "successful") && (res.message == "account_created")) {
						this.apiServices.altScc("Employee created successfully", this.goToCurrentEmployees());
	
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

	goToCurrentEmployees() {
		this.router.navigate(['/pages/employees']);
	}

}

