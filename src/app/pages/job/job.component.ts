import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-job',
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

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

    public truckers: any[];


    constructor() { }

    ngOnInit() {
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

}
