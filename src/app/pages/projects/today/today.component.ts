import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

    public arvd_proj : number;
    public arvng_proj : number;

    public act_proj_list : any[];
    public schd_proj_list : any[];

    public company_name : string = '';

  constructor() { }

  ngOnInit() {
      this.arvd_proj = 12;
      this.arvng_proj = 5;
      this.company_name = "Chandlers Landfill";

      this.act_proj_list = [
          { 'id': 1, 'name': 'Kyles Plumbing'},
          { 'id': 2, 'name': 'Kyles Plumbing'},
          { 'id': 3, 'name': 'Kyles Plumbing'},
      ];

      this.schd_proj_list = [
          { 'id': 1, 'name': 'Johns Work'},
          { 'id': 2, 'name': 'Johns Work'},
          { 'id': 3, 'name': 'Johns Work'},
      ];
  }

  my_func() {
      alert('c');
  }

}
