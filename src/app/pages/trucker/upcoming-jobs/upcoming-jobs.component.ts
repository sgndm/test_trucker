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

	public rows: any[];
    public columns: any[];
	public temp: any[];
	
	public year_list: any[];

	public selectFilter: any;
    public searchInputMonth: any;
    public searchInputYear: any;
    public searchByMonth: boolean;
    public searchByYear: boolean;

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,

	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {

		this.selectFilter = 0;
        this.searchInputMonth = 0;
		this.searchInputYear = 0;
		
		this.columns = [
            { name: 'index' },
            { name: 'job_name' },
            { name: 'job_number' },
            { name: 'job_status' },
            { name: 'date' },
            { name: 'action' },
		];
        
        this.getUserDetails(this.access_token);
		this.getUpcomingJobs(this.access_token);
    }
    
    // get user details 
	getUserDetails(token) {
		this.apiServices.getDetailsSetHeader(token).subscribe(
			(res: any) => {
				if (res.status == 'successful') {
					let userType = res.userType;

					switch (userType) {
						case "DRIVER":
							break;

						default:
							this.apiServices.altErr('You are not Authorized to go to this page', this.apiServices.logOut());
							break;
					}


				}
			}
		)
	}


	getUpcomingJobs(token) {
		this.apiServices.getUpcomingJobsTrucker(token).subscribe(
			(res: any) => {
				console.log(res);
				let tempProj = [];
                    let tempYears = [];

                    let i = 0;
                    for (let data of res.upcoming_project_list) {
                        i += 1;
                        let temp = { index: i, job_name: data.jobName, job_number: data.jobNumber, job_status: data.jobStatus, date: data.pickupDate, id: data.id };

                        tempProj.push(temp);

                        // get year 
                        let t_year = data.pickupDate;
                        t_year = t_year.split('/');
                        t_year = t_year[2];

                        if (!(tempYears.includes(t_year))) {
                            tempYears.push(t_year);
                        }


                    }
                    // projects
                    this.rows = tempProj;
                    this.temp = tempProj;

                    // years 
                    tempYears = tempYears.sort();
					this.year_list = tempYears;
					
			},
			err => {
				console.log(err);
			}
		)
	}

	// filter projects 
    onFilterProjects() {
        let searchType = this.selectFilter;

        if (searchType == 1) {
            this.searchByMonth = false;

            this.doFilterNextWeek();
        }
        else if (searchType == 2) {
            this.searchByMonth = true;
        } else {
            this.searchByMonth = false;
            this.rows = this.temp;
        }

	}
	

	// filter by month 
    filterProjects() {
        let getYear = new Date();
        let year = getYear.getFullYear();

        let month = this.searchInputMonth;
        month = month.toLowerCase();

        let result = [];
        
        // get data from table
        const temp_data = this.temp;

        // for each project
        for(let data of temp_data) {

            // date
            let temp_date = data.date;
            temp_date = temp_date.split('/');

            // get year and month 
            let t_month = temp_date[0].toLowerCase();
            let t_date = temp_date[1];
            let t_year = temp_date[2];

            // filter
            if((t_month == month) && (t_year == year)) {
                result.push(data);
            }
            
        }

        this.rows = result;

    }

    doFilterNextWeek() {
        // get today
        let getToday = new Date();
        let timestamp = getToday.getTime();

        // get date a week ago
        let getWeekAfter = (timestamp + (7 * 24 * 60 * 60 * 1000) );

        // create date week ago
        let weekAfter = new Date(getWeekAfter);
        // do filter 
        let result = [];
        
        // get data from table
        const temp_data = this.temp;

        // for each project
        for(let data of temp_data) {
            // date
            let temp_date = new Date(data.date);

            if((temp_date >= getToday) && (temp_date <= weekAfter)){
                result.push(data);
            }
        }

        this.rows = result;
    }


}
