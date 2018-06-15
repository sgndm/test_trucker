import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-job',
  templateUrl: './p-job.component.html',
  styleUrls: ['./p-job.component.css']
})
export class PJobComponent implements OnInit {

    public j_address: string = '';
    public j_status: string = '';
    public j_number: string = '';
    public j_date: string = '';
    public s_time: string = '';
    public e_time: string = '';
    public d_location: string = '';
    public j_material: string = '';
    public c_price: string = '';
    public t_fees: string = '';
    public n_loads: string = '';
    public n_trucks: string = '';
    public av_ld_truck: string = '';
    public company_name: string = '';


    public truckers: any[];
    public trucker_times: any[];


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
        this.c_price = '123';
        this.t_fees = '$ 1234.70';
        this.n_loads = '12';
        this.n_trucks = '4';
        this.av_ld_truck = '3';

        this.company_name = "Kyles Plumbing";

        this.truckers = [
          { 'name' : 'Helen Hunt', 'turns' : 3, 'id' : 1, 'times' : ['12.30', '1.30', '2.45']},
          { 'name' : 'Jane Doe', 'turns' : 3, 'id' : 2, 'times' : ['12.30', '1.30', '2.45']},
          { 'name' : 'Jane Doe', 'turns' : 3, 'id' : 3, 'times' : ['12.30', '1.30', '2.45']},
          { 'name' : 'Jane Doe', 'turns' : 3, 'id' : 4, 'times' : ['12.30', '1.30', '2.45']}
        ];


    }

}
