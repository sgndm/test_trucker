import { Component, OnInit } from '@angular/core';

// import routes
import { Router, ActivatedRoute } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
	selector: 'app-p-job',
	templateUrl: './p-job.component.html',
	styleUrls: ['./p-job.component.css']
})
export class PJobComponent implements OnInit {

	public access_token = '';

	public job_id: any;

	public j_address: string = '';
	public j_status: string = '';
	public j_number: string = '';
	public j_date: string = '';
	public s_time: any;
	public e_time: any;
	public d_location: string = '';
	public j_material: string = '';
	public c_price: string = '';
	public p_load: string = '';
	public t_fees: string = '';
	public n_loads: number;
	public n_trucks: number;
	public av_ld_truck: number;
	public company_name: string = '';


	public truckers: any[];
	public trucker_times: any[];


	constructor(
		private activeRoute: ActivatedRoute,
		public router: Router,
		private apiServices: ApiServicesService,
	) {
		this.activeRoute.params.subscribe(
			params => {
				this.job_id = params.id;
				console.log(params);

			}

		);

		this.access_token = localStorage.getItem('access_token')

	}

	ngOnInit() {

		this.truckers = [];

		this.getCompanyName(this.access_token);

		// get job details
		this.getJobDetails(this.job_id, this.access_token);
	}

	// get company name
	getCompanyName(token) {
		this.apiServices.getDetailsSetHeader(token).subscribe(
			(res: any) => {
				if (res.status == 'successful') {
					let userType = res.userType;

					switch (userType) {
						case "DUMPUSER":
							this.company_name = res.dumpUser.dumpCompany.companyName;
							break;

						default:
							this.company_name = '';
							this.apiServices.altErr('You are not Authorized to go to this page', this.apiServices.logOut());
							break;
					}


				}
			}
		)
	}

	// get job details 
	getJobDetails(id, token) {
		this.apiServices.getProjectDetails(id, token).subscribe(
			(res: any) => {
				console.log(res);
				if (res.status == "successful") {

					console.log("getProjectDetails: " + res);

					let jobDetails = res.job_details;

					this.company_name = jobDetails.job.jobName;

					let jobStTime = new Date(jobDetails.job.startTimeUTC);
					let jobEndTime = new Date(jobDetails.job.endTimeUTC);

					this.j_address = jobDetails.job.pickupAddress;
					this.j_status = jobDetails.job.jobStatus;
					this.j_number = jobDetails.job.jobNumber;
					this.j_date = jobDetails.job.pickupDate;
					this.s_time = jobStTime;
					this.e_time = jobEndTime;
					this.d_location = jobDetails.job.jobEndpoint.endpointAddress;
					this.j_material = jobDetails.job.material.type;
					this.c_price =  res.job_details.currentPrice;
					this.p_load =  res.job_details.pricePerLoad;

					this.t_fees = jobDetails.job.jobPayment.amount;
					


					let driverActivityList = res.job_details.driverActivityList;

					let truckerCount = 0;
					let loadCount = 0;

					for(let temptrukers of driverActivityList) {

						truckerCount += 1;

						let times = [];
						let turns = 0;

						for(let trucker of temptrukers){
							turns += 1;
							loadCount += 1;

							let t_time = new Date(trucker.updatedDate);
							times.push(t_time);
						}

						let temp = {
							name: temptrukers[0].driver.name,
							turns: turns,
							id: temptrukers[0].driver.id,
							times: times
						}

						this.truckers.push(temp);
	
					}

					// trucking details
					this.n_loads = loadCount;
					this.n_trucks = truckerCount;
					this.av_ld_truck = (loadCount / truckerCount);
					
				}
			},

			err => {
				console.log(err);
			}
		)
	}

}
