import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

    public site_name : string = '';
    public company_name : string = '';
    public t_loads : number;
    public t_fees : number;

    public mon_jobs: any[];
    public tue_jobs: any[];
    public wed_jobs: any[];
    public thu_jobs: any[];
    public fri_jobs: any[];
    public sat_jobs: any[];
    public sun_jobs: any[];

  constructor() { }

  ngOnInit() {
      this.site_name = "Chandlers";
      this.company_name = "Jonnys Trucking Company";
      this.t_loads = 12;
      this.t_fees = 123023;

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
