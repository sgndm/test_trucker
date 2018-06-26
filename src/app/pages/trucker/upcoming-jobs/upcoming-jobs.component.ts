import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
	selector: 'app-upcoming-jobs',
	templateUrl: './upcoming-jobs.component.html',
	styleUrls: ['./upcoming-jobs.component.css']
})
export class UpcomingJobsComponent implements OnInit {

	public access_token = '';

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,

	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {
		this.getUpcomingJobs(this.access_token);
	}

	getUpcomingJobs(token) {
		this.apiServices.getUpcomingJobsTrucker(token).subscribe(
			(res: any) => {
				console.log(res);
			},
			err => {
				console.log(err);
			}
		)
	}

}
