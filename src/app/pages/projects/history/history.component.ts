import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

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
                            this.apiServices.altErr('You are not Authorized to go to this page', this.apiServices.logOut());
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
    getProjectHistoryById(id, token) {
        this.apiServices.getProjectHistoryAll(id, token).subscribe(
            (res: any) => {
                console.log(res);

                if ((res.status == "successful") && (res.message == "projects_history")) {
                    let tempProj = [];
                    let tempYears = [];
                    
                    let i = 0;
                    for (let data of res.project_history_list) {
                        i += 1;
                        let temp = { index: i, job_name: data.jobName, job_number: data.jobNumber, job_status: data.jobStatus, date: data.pickupDate, id: data.id };

                        tempProj.push(temp);

                        // get year 
                        let t_year = data.pickupDate;
                        t_year = t_year.split('/');
                        t_year = t_year[2];

                        if(!(tempYears.includes(t_year))) {
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

        this.getProjectHistoryById(dump_s_id, this.access_token);
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
