import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-year',
  templateUrl: './p-year.component.html',
  styleUrls: ['./p-year.component.css']
})
export class PYearComponent implements OnInit {

    public proj_mon : number;
    public proj_tue : number;
    public proj_wed : number;
    public proj_thur : number;
    public proj_fri : number;
    public proj_sat : number;
    public proj_sun : number;
    public proj_jan : number;
    public proj_feb : number;
    public proj_mar : number;
    public proj_apr : number;
    public proj_may : number;
    public proj_jun : number;
    public proj_jul : number;
    public proj_aug : number;
    public proj_sep : number;
    public proj_oct : number;
    public proj_nov : number;
    public proj_dec : number;

    public company_name :string = '';

    public year_list : any[];


    constructor() { }

    ngOnInit() {

        this.company_name = "Chandlers Landfill";

        this.proj_mon = 4;
        this.proj_tue = 4;
        this.proj_wed = 4;
        this.proj_thur = 4;
        this.proj_fri = 4;
        this.proj_sat = 4;
        this.proj_sun = 4;
        this.proj_jan = 4;
        this.proj_feb = 4;
        this.proj_mar = 4;
        this.proj_apr = 4;
        this.proj_may = 4;
        this.proj_jun = 4;
        this.proj_jul = 4;
        this.proj_aug = 4;
        this.proj_sep = 4;
        this.proj_oct = 4;
        this.proj_nov = 4;
        this.proj_dec = 4;

        this.year_list = [
            { 'name': '2017', 'count': 20},
            { 'name': '2016', 'count': 0},
            { 'name': '2015', 'count': 10},
        ];
    }


}
