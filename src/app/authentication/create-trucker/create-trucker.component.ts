import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../services/api-services/api-services.service';

@Component({
	selector: 'app-create-trucker',
	templateUrl: './create-trucker.component.html',
	styleUrls: ['./create-trucker.component.css']
})
export class CreateTruckerComponent implements OnInit {

	myForm: FormGroup;

	truckerName: FormControl;
	truckerEmail: FormControl;
	truckerPhone: FormControl;
	truckerCompany: FormControl;
	truckType: FormControl;
	licenseNumber: FormControl;
	userName: FormControl;
	password: FormControl;


	public truck_types_list: any[];

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,
	) { }

	ngOnInit() {

		this.createFormControls();
		this.createForm();

		this.apiServices.getTruckTypesSignUp().subscribe(
			(res: any) => {
				console.log(res);
				if ((res.status == "successful") && (res.message == "truck_types")) {
					this.truck_types_list = res.truck_types;
				}
			},
			err => {
				console.log(err);
			}
		)
	}

	createFormControls() {
		this.truckerName = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.truckerEmail = new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]); 
		this.truckerPhone = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.truckerCompany = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.truckType = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.licenseNumber = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.userName = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.password = new FormControl('', [Validators.required, Validators.minLength(1)]);
	}

	createForm() {
		this.myForm = new FormGroup({
			truckerName: this.truckerName,
			truckerEmail: this.truckerEmail,
			truckerPhone: this.truckerPhone,
			truckerCompany: this.truckerCompany,
			truckType: this.truckType,
			licenseNumber: this.licenseNumber,
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

	onSaveTrucker() {

		if (this.myForm.valid) {
			let details = {
				name: this.myForm.value.truckerName,
				email: this.myForm.value.truckerEmail,
				phoneNumber: this.myForm.value.truckerPhone,
				company: this.myForm.value.truckerCompany,
				licenseNumber: this.myForm.value.licenseNumber,
				user: {
					username: this.myForm.value.userName,
					password: this.myForm.value.password
				}
			}

			const data = {
				user: details,
				truckType: this.myForm.value.truckType
			};

			console.log(data);

			this.apiServices.signUpTrucker(data).subscribe(
				(res: any) => {
					console.log(res);

					if (res.status == "successful") {
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
