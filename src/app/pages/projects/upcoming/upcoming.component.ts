import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
    selector: 'app-upcoming',
    templateUrl: './upcoming.component.html',
    styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

    public access_token = '';
    public company_name: string = '';

    public rows: any[];
    public columns: any[];
    public temp: any[];

    public year_list: any[];

    public dump_site_list: any[];

    public selectDumpSite: any;
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

        this.selectDumpSite = 0;
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

        // get company name
        this.getCompanyName(this.access_token);

        this.getDumpSites(this.access_token);

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
                            break;
                    }


                }
            }
        )
    }

    // get dump sites 
    getDumpSites(token) {
        this.apiServices.getDumpSites(token).subscribe(
            (res: any) => {
                console.log("\n\n dump sites\n");
                console.log(res);

                if ((res.status == "successful") && (res.message == "dump_sites_list")) {

                    let temp_site = [];

                    for (let data of res.dump_sites) {
                        let dump_site_id = data.id;
                        let dump_site_name = data.name;

                        temp_site.push({ id: dump_site_id, name: dump_site_name });
                    }

                    this.dump_site_list = temp_site;
                }


            },

            err => {
                console.log(err);
            }
        )
    }

    // get active projects by id
    getProjectsUpcomingById(id, token) {
        this.apiServices.getProjectUpcomingAll(id, token).subscribe(
            (res: any) => {
                console.log(res);

                if ((res.status == "successful") && (res.message == "upcoming_projects")) {
                    let tempProj = [];
                    let tempYears = [];

                    let i = 0;
                    for (let data of res.upcoming_project_list
                    ) {
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
                }
            },

            err => {
                console.log(err);
            }
        )
    }

    // on change dump site | get projects 
    onChangeDumpSite() {
        const dump_s_id = this.selectDumpSite;

        this.getProjectsUpcomingById(dump_s_id, this.access_token);
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
