import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../services/api-services/api-services.service';

@Component({
	selector: 'app-create-loader',
	templateUrl: './create-loader.component.html',
	styleUrls: ['./create-loader.component.css']
})
export class CreateLoaderComponent implements OnInit {

	myForm: FormGroup;

	loaderName: FormControl;
	loaderEmail: FormControl;
	loaderPhone: FormControl;
	userName: FormControl;
	password: FormControl;

	public has_card_token: boolean;
	public show_btn: boolean;

	public card_token: any;

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,
	) { }

	ngOnInit() {

		this.createFormControls();
		this.createForm();

		this.has_card_token = false;
		this.show_btn = true;
	}

	createFormControls() {
		this.loaderName = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.loaderEmail = new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]); 
		this.loaderPhone = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.userName = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.password = new FormControl('', [Validators.required, Validators.minLength(1)]);
	}

	createForm() {
		this.myForm = new FormGroup({
			loaderName: this.loaderName,
			loaderEmail: this.loaderEmail,
			loaderPhone: this.loaderPhone,
			userName: this.userName,
			password: this.password
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


	openCheckout() {
		var handler = (<any>window).StripeCheckout.configure({
			key: 'pk_test_UtC8f0nLARqp9eP09I3B5u2s',
			locale: 'auto',
			token: token => {
				console.log(token);
				// You can access the token ID with `token.id`.
				// Get the token ID to your server-side code for use.
				this.card_token = token.id;
				this.has_card_token = true;
				this.show_btn = false;
			}
		});

		handler.open({
			name: 'Trucker',
			description: 'Add Card Details',
			amount: 0,
			panelLabel: 'Save',
			allowRememberMe: false
		});

	}

	onSaveTrucker() {

		if(this.myForm.valid) {
			let user = {
				email: this.myForm.value.loaderEmail,
				name: this.myForm.value.loaderName,
				phoneNumber: this.myForm.value.loaderPhone,
				user: {
					password: this.myForm.value.password,
					username: this.myForm.value.userName
				}
			}
	
			const data = {
				user: user,
				card_token: this.card_token
			}
	
			this.apiServices.signUpLoader(data).subscribe(
				(res: any) => {
					console.log(res);
	
					if (res.status == "successful") {
						this.apiServices.altScc('Loader Created Successfully', (this.goToLogin()));
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
