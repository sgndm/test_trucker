import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dsh-complete',
  templateUrl: './dsh-complete.component.html',
  styleUrls: ['./dsh-complete.component.css']
})
export class DshCompleteComponent implements OnInit {

  week_list: any[];
  history_years: any[];

  companny_name: string ='';
  c_year: string = '';
  l_dumped: number;
  d_fees: number;
  t_used: number;

  week_name: string= '';


  mon_jobs: any[];
  tue_jobs: any[];
  wed_jobs: any[];
  thu_jobs: any[];
  fri_jobs: any[];
  sat_jobs: any[];
  sun_jobs: any[];
  truckers: any[];

  j_address: string = '';
  j_status: string = '';
  j_number: string = '';
  j_date: string = '';
  s_time: string = '';
  e_time: string = '';
  d_location: string = '';
  j_material: string = '';
  h_rate: string = '';
  t_fees: string = '';
  n_loads: string = '';
  n_trucks: string = '';
  av_ld_truck: string = '';


  constructor() { }

  ngOnInit() {

    this.companny_name = "Jonnys Grading and Excavation";

    this.history_years = [
      {'id': 1, 'name': '2016'},
      {'id': 2, 'name': '2017'},
      {'id': 3, 'name': '2018'}
    ];


  }

  get_weeks() {
    let id = $('#month').val();
    this.week_list = [
      { 'id': 1, 'name': 'January 1 - 7'},
      { 'id': 2, 'name': 'January 8 - 14'},
      { 'id': 3, 'name': 'January 15 - 21'},
      { 'id': 4, 'name': 'January 22 - 28'},
      { 'id': 5, 'name': 'January 29 - 31'}
    ];
  }

  get_jobs() {
    let id = $('#week').val();
    this.week_name = "January 1 - 7";

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
