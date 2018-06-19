import { Component, OnInit } from '@angular/core';
// import routes
import { Router, ActivatedRoute } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    public customer_id: any;
    public customer_name: '';
    public company_name: '';

    public access_token = '';

    public customerName: '';
    public email: '';
    public phone: '';
    public city: '';
    public street: '';
    public streetAddress: '';
    public state: '';
    public zipcode: '';
    public ssnEin: '';

    constructor (
        private activeRoute: ActivatedRoute,
        public router: Router,
		private apiServices: ApiServicesService,
    ) {
        this.activeRoute.params.subscribe(
            params => {
                this.customer_id = params.id;
                console.log(params);
            }

        );

        this.access_token = localStorage.getItem('access_token')

    }

    ngOnInit() {
        $('#tab_1').show();

        // get customer details
        this.getCustomerDetails(this.customer_id, this.access_token);
    }

    show_tab(tab_id, count) {
        // alert(tab_id);
        $('#' + tab_id).show();
        for (let x = 1; x <= count; x++) {
            if (x == tab_id) {
                $('#tab_' + x).show();
            } else {
                $('#tab_' + x).hide();
            }

        }
    }

    getCustomerDetails(id, token) {
        this.apiServices.getCustomerById(id, token).subscribe(
            (res:any) => {
                console.log(res);
                if(res.status == "successful") {
                    this.customer_name = res.customer.name;
                    this.company_name = res.customer.dumpCompany.companyName;

                    this.customerName = res.customer.name;
                    this.email = res.customer.email;
                    this.phone = res.customer.phoneNumber;
                    this.city = res.customer.city;
                    this.state = res.customer.state;
                    this.street = res.customer.streetAddress;
                    this.streetAddress = res.customer.streetAddress;
                    this.zipcode = res.customer.zipcode;
                    this.ssnEin = res.customer.ssnEin;
                }
            },
            err => {
                console.log(err);
            }
        )
    }

}
