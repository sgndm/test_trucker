import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import * as $ from 'jquery';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../services/api-services/api-services.service';
import swal from 'sweetalert2';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

	myForm: FormGroup;

	username: FormControl;
	password: FormControl;

	public access_token = '';

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,

	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {
		this.createFormControls();
		this.createForm();

		if (this.access_token) {
			this.getDetails(this.access_token);
		} else {
			this.apiServices.clearLocalStorage();
		}
	}

	createFormControls() {
		this.username = new FormControl('', [Validators.required, Validators.minLength(1)]);
		this.password = new FormControl('', [Validators.required, Validators.minLength(1)]);
	}

	createForm() {
		this.myForm = new FormGroup({
			username: this.username,
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

	ngAfterViewInit() {
		
		$(function () {
			$(".preloader").fadeOut();
		});

	}

	onLogin() {

		if (this.myForm.valid) {
			//this.goToDashboard();
			const data = {
				u: this.myForm.value.username,
				p: this.myForm.value.password
			};

			// call the login end point
			this.apiServices.login(data).subscribe(
				(res: Response) => {
					// if login success
					console.log(res);
					let get_access_token = res.headers.get('X-AUTH-TOKEN');

					// store token in local storage 
					this.apiServices.saveToLocalStorage(get_access_token);

					// get user details 
					this.getDetails(get_access_token);

				},

				err => {
					// if login has failed
					console.log(err);
					if (err.status == 403) {
						this.apiServices.altErr('Username or password is incorrect', '');
					}
					else if (err.status == 500) {
						this.apiServices.altErr('Server Error', this.apiServices.reload());
					}

				}
			)
		}
		else {
			this.validateAllFormFields(this.myForm);
		}
	}

	// get details
	getDetails(token) {
		this.apiServices.getDetailsSetHeader(token).subscribe(
			(res: any) => {
				console.log(res);

				if (res.status == 'successful') {
					let userType = res.userType;

					switch (userType) {
						case "WEBADMIN":
							this.goToAdminDashboard();
							break;
						case "DUMPUSER":
							this.goToDumpDashboard();
							break;

						case "DRIVER":
							this.goToTruckerDashboard();
							break;

						case "LOADER":
							this.goToLoaderDashboard();
							break;

						default:
							this.goToDashboard();
							break;
					}


				}
			},

			err => {
				console.log(err);
				this.apiServices.clearLocalStorage();

				if (err.status == 500) {
					this.apiServices.altErr('Server Error', this.apiServices.reload());
				}

			}
		)
	}


	// redirect to dashboard
	goToDashboard() {
		this.router.navigate(['/pages']);
	}

	goToAdminDashboard() {
		this.router.navigate(['/pages/admin/dump-companies']);
	}

	goToDumpDashboard() {
		this.router.navigate(['/pages/projects/today']);
	}

	goToTruckerDashboard() {
		this.router.navigate(['/pages/trucker/jobs/today']);
	}

	goToLoaderDashboard() {
		this.router.navigate(['/pages/loader']);
	}


}
