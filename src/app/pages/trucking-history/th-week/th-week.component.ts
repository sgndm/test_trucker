import { Component, OnInit, AfterViewInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';
import { Jsonp } from '@angular/http';

@Component({
	selector: 'app-th-week',
	templateUrl: './th-week.component.html',
	styleUrls: ['./th-week.component.css']
})
export class ThWeekComponent implements OnInit {

	public mon_jobs: any[];
	public tue_jobs: any[];
	public wed_jobs: any[];
	public thu_jobs: any[];
	public fri_jobs: any[];
	public sat_jobs: any[];
	public sun_jobs: any[];

	public access_token = '';

	constructor(
		public apiServices: ApiServicesService,
		private router: Router 
	) { 
		this.access_token = localStorage.getItem('access_token');
	}

	ngOnInit() {

		

		// get truking history
		// if no jobs | set name to 'No Jobs Started' and id to '0'

		this.mon_jobs = [
			{ 'name': '123 Main Street', 'id': 1 },
			{ 'name': 'Amber Street', 'id': 2 },
			{ 'name': 'Second Street', 'id': 3 }
		];

		this.tue_jobs = [
			{ 'name': 'No Jobs Started', 'id': 0 }
		];

		this.wed_jobs = [
			{ 'name': 'No Jobs Started', 'id': 0 }
		];

		this.thu_jobs = [
			{ 'name': 'No Jobs Started', 'id': 0 }
		];

		this.fri_jobs = [
			{ 'name': 'No Jobs Started', 'id': 0 }
		];

		this.sat_jobs = [
			{ 'name': 'No Jobs Started', 'id': 0 }
		];

		this.sun_jobs = [
			{ 'name': 'No Jobs Started', 'id': 0 }
		];

	}


	ngAfterViewInit() {
		// location.reload();
	}

}
