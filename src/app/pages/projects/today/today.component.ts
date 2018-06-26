import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
    selector: 'app-today',
    templateUrl: './today.component.html',
    styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

    public access_token = '';

    public arvd_proj: number;
    public arvng_proj: number;

    public act_proj_list: any[];
    public schd_proj_list: any[];

    public company_name: string = '';

    constructor(
        public router: Router,
        private apiServices: ApiServicesService,

    ) {
        this.access_token = localStorage.getItem('access_token')
    }

    ngOnInit() {
        this.arvd_proj = 0;
        this.arvng_proj = 0;

        this.act_proj_list = [];
        this.schd_proj_list = [];

        // get company name
        this.getCompanyName(this.access_token);

        this.getDumpSites(this.access_token);

    }

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

                if((res.status == "successful") && (res.message == "dump_sites_list")) {

                    let i = 0;
                    for(let data of res.dump_sites) {
                        let dump_site_id = data.id;

                        // get project counts
                        this.getProjectCountsById(dump_site_id, this.access_token);

                        // get active projects by id 
                        this.getActiveProjectById(dump_site_id, this.access_token);

                        // get scheduled projects 
                        this.getScheduledProjectsById(dump_site_id, this.access_token);
                    }
                }

                
            },

            err => {
                console.log(err);
            }
        )
    }


    // get project counts
    getProjectCountsById(id, token) {
        this.apiServices.getProjectCountsById(id, token).subscribe(
            (res: any) => {
                console.log("\n\n project counts \n");
                console.log(res);

                if((res.status == "successful") && (res.message == "project_counts")) {
                    this.arvd_proj += res.active_count;
                    this.arvng_proj += res.upcoming_count;
                }
            },
            err => {
                console.log(err);
            }
        )
    }

    // get active projects by id
    getActiveProjectById(id, token) {
        this.apiServices.getActiveProjectsTodayById(id, token).subscribe(
            (res: any) => {
                console.log(res);

                if((res.status == "successful") && (res.message == "active_projects_for_today")) {
                    for(let jobs of res.active_jobs) {
                        
                        let temp = { id: jobs.id, name: jobs.jobName };

                        this.act_proj_list.push(temp);
                    }
                }
            },

            err => {
                console.log(err);
            }
        )
    }

    // get scheduled project by id 
    getScheduledProjectsById(id, token) {
        this.apiServices.getScheduledProjectsTodayById(id, token).subscribe(
            (res: any) => {
                console.log(res);
                if((res.status == "successful") && (res.message == "scheduled_projects_for_today")) {
                    for(let jobs of res.scheduled_jobs) {
                        
                        let temp = { id: jobs.id, name: jobs.jobName };

                        this.schd_proj_list.push(temp);
                    }
                }
            },
            err => {
                console.log(err);
            }
        )
    }

}
