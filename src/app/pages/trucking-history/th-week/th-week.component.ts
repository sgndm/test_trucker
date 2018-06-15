import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-th-week',
  templateUrl: './th-week.component.html',
  styleUrls: ['./th-week.component.css']
})
export class ThWeekComponent implements OnInit {

  public mon_jobs: any[];
  public tue_jobs: any[];
  public wed_jobs: any[];
  public thu_jobs: any[];
  public fri_jobs: any[];
  public sat_jobs: any[];
  public sun_jobs: any[];

  constructor() { }

  ngOnInit() {

    // get truking history
    // if no jobs | set name to 'No Jobs Started' and id to '0'

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




}
