import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';

// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../services/api-services/api-services.service';


@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

	myForm: FormGroup;

	 compName:FormControl;
	 compStrAddress:FormControl;
	 compCountry:FormControl;
	 compCity:FormControl;
	 compZipCode:FormControl;
	 compLatitude:FormControl;
	 compLongitude:FormControl;

	 dumpSiteName:FormControl;
	 dumpStrAddress:FormControl;
	 dumpStrDetails:FormControl;
	 dumpCity:FormControl;
	 dumpZipCode:FormControl;
	 dumpLatitude:FormControl;
	 dumpLongitude:FormControl;
	 dumpSitePhone:FormControl;


	 dumpuserName:FormControl;
	 email:FormControl;
	 userPhone:FormControl;
	 userName:FormControl;
	 password:FormControl;

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,
	) { }

	ngOnInit() {
		this.createFormControls();
		this.createForm();

	}

	createFormControls() {
		this.compName = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.compStrAddress = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.compCountry = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.compCity = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.compZipCode = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.compLatitude = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.compLongitude = new FormControl('', [Validators.required, Validators.minLength(1)]);

		this.dumpSiteName = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.dumpStrAddress = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.dumpStrDetails = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.dumpCity = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.dumpZipCode = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.dumpLatitude = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.dumpLongitude = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.dumpSitePhone = new FormControl('', [Validators.required, Validators.minLength(1)]);

		
		this.dumpuserName = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.email = new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]); 
		this.userPhone = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.userName = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.password = new FormControl('', [Validators.required, Validators.minLength(1)]);
	}

	createForm() {
		this.myForm = new FormGroup({
			compName: this.compName,
			compCountry: this.compCountry,
			compStrAddress: this.compStrAddress,
			compCity: this.compCity,
			compZipCode: this.compZipCode,
			compLatitude: this.compLatitude,
			compLongitude: this.compLongitude,

			dumpSiteName: this.dumpSiteName,
			dumpStrAddress: this.dumpStrAddress,
			dumpStrDetails: this.dumpStrDetails,
			dumpCity: this.dumpCity,
			dumpZipCode: this.dumpZipCode,
			dumpLatitude: this.dumpLatitude,
			dumpLongitude: this.dumpLongitude,
			dumpSitePhone: this.dumpSitePhone,

			dumpuserName: this.dumpuserName,
			email: this.email,
			userPhone: this.userPhone,
			userName: this.userName,
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

	onSignUp() {

		if(this.myForm.valid) {
			const data = {
				dupmCompany: {
					"companyName": this.myForm.value.compName,
					"city": this.myForm.value.compCity,
					"stree": this.myForm.value.compStrAddress,
					"county": this.myForm.value.compCountry,
					"zipCode": this.myForm.value.compZipCode,
					"longitude": this.myForm.value.compLatitude,
					"latitude": this.myForm.value.compLongitude
				},
				dumpSite: [
					{
						"name": this.myForm.value.dumpSiteName,
						"latitude": this.myForm.value.dumpLatitude,
						"longitude": this.myForm.value.dumpLongitude,
						"city": this.myForm.value.dumpCity,
						"phone": this.myForm.value.dumpSitePhone,
						"zipCode": this.myForm.value.dumpZipCode,
						"street": this.myForm.value.dumpStrAddress,
						"streetDetails": this.myForm.value.dumpStrDetails
					}
				],
				dumpUser: {
					"name": this.myForm.value.dumpuserName,
					"email": this.myForm.value.email,
					"phoneNumber": this.myForm.value.userPhone,
					"user": {
						"username": this.myForm.value.userName,
						"password": this.myForm.value.password
					}
				}
			}
	
			console.log(data);
	
			// call server 
			this.apiServices.signUp(data).subscribe(
				(res: any) => {
					if(res.status == "successful") {
						this.apiServices.altScc('successfully created a dump site', this.goToLogin());
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

	goToLogin() {
		this.router.navigate(['/sign-in']);
	}

}
