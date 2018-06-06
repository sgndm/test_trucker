import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-day',
  templateUrl: './p-day.component.html',
  styleUrls: ['./p-day.component.css']
})
export class PDayComponent implements OnInit {

    public company_name : string = '';
    public p_date : string = '';
    public p_title : string = '';

    public act_proj_list : any[];

  constructor() { }

  ngOnInit() {

      this.company_name = "Chandlers Landfill";
      this.p_date = "Monday February 1st 2018";

      this.act_proj_list = [
          { 'id': 1, 'name': 'Kyles Plumbing'},
          { 'id': 2, 'name': 'Kyles Plumbing'},
          { 'id': 3, 'name': 'Kyles Plumbing'},
      ];

  }

}
