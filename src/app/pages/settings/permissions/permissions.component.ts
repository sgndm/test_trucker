import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

    public company_name : string = '';
    public employee_list : any[];

  constructor() { }

  ngOnInit() {
      this.company_name = "Chandlers Landfill";
      this.employee_list = [
          {'id': 1, 'name': 'Bob Smith'},
          {'id': 2, 'name': 'Trever Smith'}
      ];
  }

}
