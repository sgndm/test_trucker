import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';


@Component({
	selector: 'app-past-jobs',
	templateUrl: './past-jobs.component.html',
	styleUrls: ['./past-jobs.component.css']
})
export class PastJobsComponent implements OnInit {

	public access_token = '';

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,

	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {
		this.getPastJobs(this.access_token);
	}

	getPastJobs(token) {
		this.apiServices.getPastJobsTrucker(token).subscribe(
			(res: any) => {
				console.log(res);
			},
			err => {
				console.log(err);
			}
		)
	}

}
