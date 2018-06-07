import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

    public company_name : string = '';
    public manager_name : string = '';

    constructor() { }

    ngOnInit() {
        this.company_name = "Chandlers Landfill";
        this.manager_name = "Bob Smith";
    }

}
