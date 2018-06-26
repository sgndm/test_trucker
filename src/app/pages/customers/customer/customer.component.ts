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

    public newPassword: '';

    public rows: any[];
    public columns: any[];
    public temp: any[];

    public accountHold: boolean;

    public userStatus: any;

    constructor(
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
        this.accountHold = true;
        $('#tab_1').show();

        this.getCompanyName(this.access_token);

        // get customer details
        this.getCustomerDetails(this.customer_id, this.access_token);

        // get dump activies 
        this.getDumpActivities(this.customer_id, this.access_token);
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
                            this.apiServices.altErr('You are not Authorized to go to this page', this.apiServices.logOut());
                            break;
                    }


                }
            }
        )
    }


    show_tab(tab_id, count) {

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
            (res: any) => {
                console.log(res);
                if (res.status == "successful") {
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

                    this.userStatus = res.customer.dumpUserStatus;
                }
            },
            err => {
                console.log(err);
            }
        )
    }

    onPutHoldAccount(id, event) {

        const data = {
            customerId: id
        }

        this.apiServices.putAccountOnHold(data, this.access_token).subscribe(
            (res: any) => {
                console.log(res);
                if ((res.status == "successful") && (res.message == "account_onhold")) {
                    this.apiServices.altScc('Successfully blocked customer', this.apiServices.reload());

                }
            },
            err => {
                console.log(err);
            }
        )
    }

    onActivateAccount(id, event) {

        const data = {
            customerId: id
        }

        this.apiServices.activateCustomer(data, this.access_token).subscribe(
            (res: any) => {
                console.log(res);
                if ((res.status == "successful") && (res.message == "account_active")) {

                    this.apiServices.altScc('Successfully activated customer', this.apiServices.reload());
                }
            },
            err => {
                console.log(err);
            }
        )
    }

    getDumpActivities(id, token) {
        this.apiServices.getDumpActivity(id, token).subscribe(
            (res: any) => {
                console.log("\n\ndump activity \n");
                console.log(res);

                let tempArray = [];

                // bind data to table 
                let i = 0;
                if (res.customer_activity) {
                    for (let data of res.customer_activity) {
                        i += 1;

                        let stTime = new Date(data.startTime);
                        let endTime = new Date(data.endTime);

                        let tempRow = {
                            index: i,
                            job_id: data.id,
                            job_name: data.jobName,
                            job_category: data.jobCategory,
                            status: data.jobStatus,
                            driver: data.driver,
                            start_time: stTime,
                            end_time: endTime,
                            payment: data.jobPayment.paymentStatus
                        }

                        tempArray.push(tempRow);
                    }
                }


                this.rows = tempArray;
                this.temp = this.rows;

                this.columns = [
                    { name: 'index' },
                    { name: 'job_name' },
                    { name: 'job_category' },
                    { name: 'status' },
                    { name: 'driver' },
                    { name: 'start_time' },
                    { name: 'end_time' },
                    { name: 'payment' }
                ];
            },
            err => {
                console.log(err);
            }
        )
    }

    updateFilter(event) {

    }

    onDeleteCustomer(id) {
        const data = {
            customerId: id
        }

        this.apiServices.deleteCustomer(data, this.access_token).subscribe(
            (res: any) => {
                // console.log(res);

                if ((res.status == "successful") && (res.message == "account_deleted")) {

                    this.apiServices.altScc('Account Delete Successfully', this.goToCurrentCustomer());
                }
            },

            err => {
                console.log(err);
            }
        )
        
    }

    goToCurrentCustomer() {
        this.router.navigate(['/pages/customers/current']);
    }

    onUpdateCustonmer(id) {
        const data = {
            name: this.customerName,
            email: this.email,
            phoneNumber: this.phone,
            state: this.state,
            city: this.city,
            streetAddress: this.streetAddress,
            zipcode: this.zipcode,
            ssnEin: this.ssnEin,
            dump_customer_id: id
        }

        this.apiServices.updateCustomer(data, this.access_token).subscribe(
            (res: any) => {
                console.log(res);

                if ((res.status == "successful") && (res.message == "cutomer_account_updated")) {
                    this.apiServices.altScc('Customer Updated Successfully', this.apiServices.reload());
                }

            },

            err => {
                console.log(err);
            }
        )

    }

    onResetPassword(id) {
        const data = {
            customerId: id,
            newPassword: this.newPassword
        }

        this.apiServices.resetPassword(data, this.access_token).subscribe(
            (res: any) => {
                // console.log(res);
                if ((res.status == "successful") && (res.message == "cutomer_account_updated")) {

                    this.apiServices.altScc('Password Updated Successfully', this.apiServices.reload());

                }

            },
            err => {
                console.log(err);
            }
        )
    }

}
