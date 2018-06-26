import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
	selector: 'app-today-jobs',
	templateUrl: './today-jobs.component.html',
	styleUrls: ['./today-jobs.component.css']
})
export class TodayJobsComponent implements OnInit {

	public access_token = '';

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,

	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {
		this.getCurrentJobs(this.access_token);
	}

	getCurrentJobs(token) {
		this.apiServices.getCurrentJobsTrucker(token).subscribe(
			(res: any) => {
				console.log(res);
			},
			err => {
				console.log(err);
			}
		)
	}

}
