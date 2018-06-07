import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-current-customers',
    templateUrl: './current-customers.component.html',
    styleUrls: ['./current-customers.component.css']
})
export class CurrentCustomersComponent implements OnInit {

    public company_name : string = '';
    public customer_list : any[];
    public categories_list : any[];



    constructor() { }

    ngOnInit() {

        this.company_name = "Chandlers Landfill";



        this.categories_list = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    }

    get_customers(category) {
        // alert(category);
        if(category == '0-9') {
            this.customer_list = [
                {'id': 1, 'name': '10-4 Trucking'},
                {'id': 2, 'name': '7-11 Trucking'},
                {'id': 3, 'name': '1-4 Trucking'}
            ];
        }
        else if(category == 'A') {
            this.customer_list = [
                {'id': 4, 'name': 'Adams Trucking'},
                {'id': 5, 'name': 'AAA Trucking'},
                {'id': 6, 'name': 'Angle Trucking'}
            ];
        } else {
            this.customer_list = [];
        }

    }

}
