import { Component, OnInit } from '@angular/core';

// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-current-customers',
    templateUrl: './current-customers.component.html',
    styleUrls: ['./current-customers.component.css']
})
export class CurrentCustomersComponent implements OnInit {

    public access_token = '';

    public company_name: string = '';
    public customer_list: any[];
    public categories_list: any[];

    public rows: any[];
    public columns: any[];
    public temp: any[];



    constructor(
        public router: Router,
        private apiServices: ApiServicesService,

    ) {
        this.access_token = localStorage.getItem('access_token')
    }

    ngOnInit() {

        // get customer details
        this.getDetailsAndCreatTable();

        // get company name
        this.getCompanyName(this.access_token);

        // category list
        this.categories_list = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    }

    // getDetailsAndCreatTable
    getDetailsAndCreatTable() {
        this.apiServices.getCustomerDetails(this.access_token).subscribe(
            (res: any) => {
                console.log("\n\n dump site customers");
                console.log(res);

                let tempArray = [];

                // bind data to table 
                let i = 0;
                for (let data of res.customers) {
                    i += 1;
                    let tempRow = {
                        index: i,
                        cust_name: data.name,
                        cust_id: data.id,
                        cust_phone: data.phoneNumber,
                        email: data.email,
                        status: data.dumpUserStatus
                    }

                    tempArray.push(tempRow);
                }

                this.rows = tempArray;
                this.temp = this.rows;

                this.columns = [
                    { name: 'index' },
                    { name: 'cust_name' },
                    { name: 'cust_phone' },
                    { name: 'email' },
                    { name: 'status' },
                    { name: 'action' },
                ];

            },

            err => {
                console.log(err);
            }
        )
    }

    get_customers(category) {
        // alert(category);
        const val = category.toLowerCase();

        // get data
        const temp_data = this.temp;

        let result = [];
        // filter
        for(let data of temp_data) {
            let t_name = data.cust_name.substring(0,1);

            if(val == '0-9') {
                for(let i = 0; i < 10; i++) {
                    if(val == parseInt(t_name)) {
                        result.push(data);
                    }
                }
            } 
            else {
                if(val == t_name) {
                    result.push(data);
                }
            }
            

        }

        // update the rows
        this.rows = result;

    }

    onPutHoldCustomer(id) {
        const data = {
            customerId: id
        }
        // alert(id);
        this.apiServices.putAccountOnHold(data, this.access_token).subscribe(
            (res: any) => {
                // console.log(res);
                if ((res.status == "successful") && (res.message == "account_onhold")) {
                    
                    this.apiServices.altScc('Successfully blocked customer',  this.getDetailsAndCreatTable());

                }
            },

            err => {
                console.log(err);
            }
        )
    }

    onActivateCustomer(id) {
        const data = {
            customerId: id
        }
        // alert(id);
        this.apiServices.activateCustomer(data, this.access_token).subscribe(
            (res: any) => {
                // console.log(res);
                if ((res.status == "successful") && (res.message == "account_active")) {
                    
                   this.apiServices.altScc('Successfully activated customer',  this.getDetailsAndCreatTable());
                    
                }
            },

            err => {
                console.log(err);
            }
        )
    }

    getCompanyName(token) {
        this.apiServices.getDetailsSetHeader(token).subscribe(
            (res: any) => {
                if (res.status == 'successful') {
                    let userType = res.userType;

                    switch (userType) {
                        case "DUMPUSER":
                            this.company_name = res.dumpUser.dumpCompany.companyName;
                            break;

                        default:
                            this.company_name = '';
                            break;
                    }


                }
            }
        )
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp_data = this.temp.filter(function(d) {
          return d.cust_name.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.rows = temp_data;
    }

}
