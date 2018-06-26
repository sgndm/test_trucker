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

	public rows: any[];
	public columns: any[];
	public temp: any[];

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,

	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {

		this.columns = [
			{ name: 'index' },
			{ name: 'job_name' },
			{ name: 'job_number' },
			{ name: 'job_status' },
			{ name: 'date' },
			{ name: 'action' },
		];

		this.getCurrentJobs(this.access_token);
	}

	getCurrentJobs(token) {
		this.apiServices.getCurrentJobsTrucker(token).subscribe(
			(res: any) => {
				console.log(res);

				if (res.status == "successful") {
					let tempProj = [];

					let i = 0;

					for (let data of res.jobs) {
						i += 1;
						let temp = { index: i, job_name: data.job.jobName, job_number: data.job.jobNumber, job_status: data.jobStatus, date: data.job.pickupDate, id: data.job.id };

						tempProj.push(temp);
					}

					// projects
					this.rows = tempProj;
					this.temp = tempProj;
				}


			},
			err => {
				console.log(err);
			}
		)
	}


}
