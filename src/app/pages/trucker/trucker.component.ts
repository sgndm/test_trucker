import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trucker',
  templateUrl: './trucker.component.html',
  styleUrls: ['./trucker.component.css']
})
export class TruckerComponent implements OnInit {

  trucker_id: any;
  truck_turns: any[];

  trucker_name: string = '';
  job_name: string = '';
  j_date: string = '';
  s_time: string = '';
  e_time: string = '';
  p_p_time: string = '';
  t_w_hours: number;
  h_t_rate: string = '';
  t_i_total: string = '';
  n_loads: number;
  a_r_trips: number;

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(res => this.trucker_id = res.id);
  }

  ngOnInit() {

    // get user details
    // check if usser id
    if(this.trucker_id) {
      // alert(this.trucker_id);
      // get trucker details

      // set to variables
      this.trucker_name = "Helen Hunter's Details";
      this.job_name = "123 Main Street";
      this.j_date = "02/05/2018";
      this.s_time = "7.11 am";
      this.e_time = "3.30 pm";
      this.p_p_time = "30 Minutes";
      this.t_w_hours = 8.30;
      this.h_t_rate = "$ 125";
      this.t_i_total = "$ 12302.30";
      this.n_loads = 4;
      this.a_r_trips = 12.2;

      this.truck_turns = [
        { 'index': 1, 'left': '7.19 am', 'arrived': '7.55 am' },
        { 'index': 2, 'left': '7.19 am', 'arrived': '7.55 am' },
        { 'index': 3, 'left': '7.19 am', 'arrived': '7.55 am' },
        { 'index': 4, 'left': '7.19 am', 'arrived': '7.55 am' },
      ];

    }
    else {
      alert('No ID');
    }
  }

}
