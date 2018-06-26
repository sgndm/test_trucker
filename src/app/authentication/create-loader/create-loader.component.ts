import { Component, OnInit } from '@angular/core';
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

	public loaderName: any;
	public loaderEmail: any;
	public loaderPhone: any;
	public userName: any;
	public password: any;

	public has_card_token: boolean;
	public show_btn: boolean;

	public card_token: any;

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,
	) { }

	ngOnInit() {
		this.has_card_token = false;
		this.show_btn = true;
	}


	openCheckout() {
		var handler = (<any>window).StripeCheckout.configure({
			key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
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
		let user = {
			email: this.loaderEmail,
			name: this.loaderName,
			phoneNumber: this.loaderPhone,
			user: {
				password: this.password,
				username: this.userName
			}
		}

		const data = {
			user: user,
			card_token: this.card_token
		}

		this.apiServices.signUpLoader(data).subscribe(
			(res: any) => {
				console.log(res);

				if(res.status == "successful") {
					this.apiServices.altScc('Loader Created Successfully', this.goToLogin);
				}
			}, 
			err => {
				console.log(err);
			}
		)
		
	}


	goToLogin() {
		this.router.navigate(['/sign-in']);
	}



}
