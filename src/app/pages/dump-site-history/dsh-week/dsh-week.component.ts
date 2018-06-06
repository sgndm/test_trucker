import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dsh-week',
    templateUrl: './dsh-week.component.html',
    styleUrls: ['./dsh-week.component.css']
})
export class DshWeekComponent implements OnInit {

    public dump_sites: any[];

    public t_loads: number;
    public t_t_fees: number;

    public site_name: string = '';

    public mon_jobs: any[];
    public tue_jobs: any[];
    public wed_jobs: any[];
    public thu_jobs: any[];
    public fri_jobs: any[];
    public sat_jobs: any[];
    public sun_jobs: any[];
    public truckers: any[];

    public j_address: string = '';
    public j_status: string = '';
    public j_number: string = '';
    public j_date: string = '';
    public s_time: string = '';
    public e_time: string = '';
    public d_location: string = '';
    public j_material: string = '';
    public h_rate: string = '';
    public t_fees: string = '';
    public n_loads: string = '';
    public n_trucks: string = '';
    public av_ld_truck: string = '';

    public dump_site_mod : string = '';

    constructor() { }

    ngOnInit() {
        this.dump_site_mod = "0";
        this.t_loads = 10;
        this.t_t_fees = 1234;

        this.dump_sites = [
            {'id': 1, 'name': 'Chandlers', 'loads': 10},
            {'id': 2, 'name': 'ABC', 'loads': 5},
            {'id': 3, 'name': 'ABCD', 'loads': 0},
        ];

    }

    get_dump_site() {
        this.site_name = "Chandlers";

        this.mon_jobs = [
            { 'name' : '123 Main Street', 'id' : 1 },
            { 'name' : 'Amber Street', 'id' : 2  },
            { 'name' : 'Second Street', 'id' : 3  }
        ];

        this.tue_jobs = [
            { 'name' : 'No Jobs Started', 'id' : 0 }
        ];

        this.wed_jobs = [
            { 'name' : 'No Jobs Started', 'id' : 0 }
        ];

        this.thu_jobs = [
            { 'name' : 'No Jobs Started', 'id' : 0}
        ];

        this.fri_jobs = [
            { 'name' : 'No Jobs Started', 'id' : 0}
        ];

        this.sat_jobs = [
            { 'name' : 'No Jobs Started', 'id' : 0}
        ];

        this.sun_jobs = [
            { 'name' : 'No Jobs Started', 'id' : 0}
        ];

    }

    // get job details
    get_details(id) {
    // create a ajax request

    if(id == 1) {
        this.j_address = '123 Street';
        this.j_status = 'Completed';
        this.j_number = '2011';
        this.j_date = '02.05.2018';
        this.s_time = '7.00 am';
        this.e_time = '3.30 pm';
        this.d_location = 'Chandlers Corona';
        this.j_material = 'Clean Dirt';
        this.h_rate = '123';
        this.t_fees = '$ 1234.70';
        this.n_loads = '12';
        this.n_trucks = '4';
        this.av_ld_truck = '3';

        this.truckers = [
            { 'name' : 'Helen Hunt', 'turns' : 3, 'id' : 1},
            { 'name' : 'Jane Doe', 'turns' : 3, 'id' : 2},
            { 'name' : 'Jane Doe', 'turns' : 3, 'id' : 3},
            { 'name' : 'Jane Doe', 'turns' : 3, 'id' : 4}
        ];
    }
    else if(id == 2) {
        this.j_address = 'Amber Street';
        this.j_status = 'Ongoing';
        this.j_number = '2012';
        this.j_date = '02.05.2018';
        this.s_time = '7.00 am';
        this.e_time = '';
        this.d_location = 'Chandlers Corona';
        this.j_material = 'Clean Dirt';
        this.h_rate = '123';
        this.t_fees = '';
        this.n_loads = '4';
        this.n_trucks = '2';
        this.av_ld_truck = '2';

        this.truckers = [
            { 'name' : 'Helen Hunt', 'turns' : 2, 'id' : 1},
            { 'name' : 'Jane Doe', 'turns' : 2, 'id' : 2}
        ];
    }
    else {
        this.j_address = '';
        this.j_status = '';
        this.j_number = '';
        this.j_date = '';
        this.s_time = '';
        this.e_time = '';
        this.d_location = '';
        this.j_material = '';
        this.h_rate = '';
        this.t_fees = '';
        this.n_loads = '';
        this.n_trucks = '';
        this.av_ld_truck = '';

        this.truckers = [];
    }

}

}
