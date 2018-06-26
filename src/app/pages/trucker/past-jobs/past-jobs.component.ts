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

        // this.rows = [];

        this.columns = [
            { name: 'index' },
            { name: 'job_name' },
            { name: 'job_number' },
            { name: 'job_status' },
            { name: 'date' },
            { name: 'action' },
		];
		
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


	// filter projects 
    onFilterProjects() {
        let searchType = this.selectFilter;

        if (searchType == 1) {
            this.searchByYear = false;
            this.searchByMonth = false;

            this.doFilterLastWeek();
        }
        else if (searchType == 2) {
            this.searchByMonth = true;
            this.searchByYear = false;
        }
        else if (searchType == 3) {
            this.searchByYear = true;
            this.searchByMonth = false;
        }
        else if (searchType == 4) {
            this.searchByYear = true;
            this.searchByMonth = true;
        } else {
            this.searchByYear = false;
            this.searchByMonth = false;

            this.rows = this.temp;
        }

    }

    filterProjects() {

        // get filter type
        let searchType = this.selectFilter;

        // get year and month 
        let inputMonth = this.searchInputMonth;
        let inputYear = this.searchInputYear;

        if (searchType == 2) {
            // current year 
            let getYear = new Date();
            let inputYear = getYear.getFullYear();
            this.doFilterProjects(inputYear, inputMonth);
        }
        else if((searchType == 3) || (searchType == 4)){
            this.doFilterProjects(inputYear, inputMonth);
        }

    }

    // filter by year and month
    doFilterProjects(year, month) {

        // month to lowercase
        if(month !== 0){
            month = month.toLowerCase();
        }
        

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
            if(month == 0) {
                if(t_year == year) {
                    result.push(data);
                }
            } else {
                if((t_month == month) && (t_year == year)) {
                    result.push(data);
                }
            }
            
        }

        this.rows = result;

    }

    // filter by last week 
    doFilterLastWeek() {
        // get today
        let getToday = new Date();
        let timestamp = getToday.getTime();

        // get date a week ago
        let getWeekBefore = (timestamp - (7 * 24 * 60 * 60 * 1000) );

        // create date week ago
        let weekBefore = new Date(getWeekBefore);
        // do filter 
        let result = [];
        
        // get data from table
        const temp_data = this.temp;

        // for each project
        for(let data of temp_data) {
            // date
            let temp_date = new Date(data.date);

            if((temp_date <= getToday) && (temp_date >= weekBefore)){
                result.push(data);
            }
        }

        this.rows = result;

    }



}
