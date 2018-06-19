import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
// import routes
import { Router } from '@angular/router';

// import api services
import { ApiServicesService } from '../../services/api-services/api-services.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

	// declare variables
	public username = '';
	public password = '';

	public access_token = '';

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,
		
	) { 
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {
		if(this.access_token){
			this.apiServices.getDetailsSetHeader(this.access_token).subscribe(
				(res: any) => {
					console.log(res);
					
					if(res.status == 'successful') {
						let userType = res.userType;

						switch(userType) {
							case "WEBADMIN" :
								this.goToAdminDashboard();
								break;
							case "DUMPUSER" :
								this.goToDumpDashboard();
							   break;

							default:
								this.goToDashboard();
								break;
						}
						

					} else {
						alert('Please Refresh again..');
					}

				},

				err => {
					console.log(err);
					this.apiServices.clearLocalStorage();
				}
			)
		} else {
			this.apiServices.clearLocalStorage();
		}
	}

	ngAfterViewInit() {
		$(function () {
			$(".preloader").fadeOut();
		});

	}

	onLoggedin() {

		//this.goToDashboard();
		const data = {
			u: this.username,
			p: this.password
		};

		// call the login end point
		this.apiServices.login(data).subscribe(
			(res: Response) => {
				// if login success
				console.log(res);
				let get_access_token = res.headers.get('X-AUTH-TOKEN');

				// store token in local storage 
				this.apiServices.saveToLocalStorage(get_access_token);

				// get details
				this.apiServices.getDetailsSetHeader(get_access_token).subscribe(
					(res: any) => {
						console.log(res);
						
						if(res.status == 'successful') {
							let userType = res.userType;
	
							switch(userType) {
								case "WEBADMIN" :
									this.goToAdminDashboard();
									break;
								case "DUMPUSER" :
									this.goToDumpDashboard();
								   break;
	
								default:
									this.goToDashboard();
									break;
							}
							
	
						} else {
							alert('Please Refresh again..');
						}
	
					},
	
					err => {
						console.log(err);
						this.apiServices.clearLocalStorage();
					}
				)
					
				

			},

			err => {
				// if login has failed
				console.log(err);
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

}
