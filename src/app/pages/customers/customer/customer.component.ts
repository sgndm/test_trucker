import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
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

    myForm: FormGroup;
    myForm2: FormGroup;

    customerName: FormControl;
    email: FormControl;
    phone: FormControl;
    city: FormControl;
    street: FormControl;
    streetAddress: FormControl;
    state: FormControl;
    zipcode: FormControl;
    ssnEin: FormControl;

    newPassword: FormControl;

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

        this.createFormControls();
        this.createForm();
        this.createForm2();

        this.getCompanyName(this.access_token);

        // get customer details
        this.getCustomerDetails(this.customer_id, this.access_token);

        // get dump activies 
        this.getDumpActivities(this.customer_id, this.access_token);
    }

    createFormControls() {
        this.customerName = new FormControl('', [Validators.required, Validators.minLength(1)]);
        this.phone = new FormControl('', [Validators.required, Validators.minLength(1)]);
        this.city = new FormControl('', [Validators.required, Validators.minLength(1)]);
        this.street = new FormControl('', [Validators.required, Validators.minLength(1)]);
        this.streetAddress = new FormControl('', [Validators.required, Validators.minLength(1)]);
        this.state = new FormControl('', [Validators.required, Validators.minLength(1)]);
        this.zipcode = new FormControl('', [Validators.required, Validators.minLength(1)]);
        this.ssnEin = new FormControl('', [Validators.required, Validators.minLength(1)]);
        this.email = new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]);
        this.newPassword = new FormControl('', [Validators.required, Validators.minLength(1)]);

    }

    createForm() {
        this.myForm = new FormGroup({
            customerName: this.customerName,
            phone: this.phone,
            city: this.city,
            street: this.street,
            streetAddress: this.streetAddress,
            state: this.state,
            zipcode: this.zipcode,

            ssnEin: this.ssnEin,
            email: this.email,
        });
    }

    createForm2() {
        this.myForm2 = new FormGroup({
            newPassword : this.newPassword
        });
    }

    validateAllFormFields(formGroup: FormGroup) {

        Object.keys(formGroup.controls).forEach(field => {

            const control = formGroup.get(field);

            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }

        });

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
                    this.myForm.setValue({
                        customerName: res.customer.name,
                        email: res.customer.email,
                        phone: res.customer.phoneNumber,
                        city: res.customer.city,
                        street: res.customer.streetAddress,
                        streetAddress: res.customer.streetAddress,
                        state: res.customer.state,
                        zipcode: res.customer.zipcode,
                        ssnEin: res.customer.ssnEin
                    });
                    this.customer_name = res.customer.name;
                    this.company_name = res.customer.dumpCompany.companyName;

                    // this.customerName = res.customer.name;
                    // this.email = res.customer.email;
                    // this.phone = res.customer.phoneNumber;
                    // this.city = res.customer.city;
                    // this.state = res.customer.state;
                    // this.street = res.customer.streetAddress;
                    // this.streetAddress = res.customer.streetAddress;
                    // this.zipcode = res.customer.zipcode;
                    // this.ssnEin = res.customer.ssnEin;

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

    updateFilter(event) {}

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

    onUpdateCustomer(id) {

        if (this.myForm.valid) {
            const data = {
                name: this.myForm.value.customerName,
                email: this.myForm.value.email,
                phoneNumber: this.myForm.value.phone,
                state: this.myForm.value.state,
                city: this.myForm.value.city,
                streetAddress: this.myForm.value.streetAddress,
                zipcode: this.myForm.value.zipcode,
                ssnEin: this.myForm.value.ssnEin,
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
        else {
            this.validateAllFormFields(this.myForm);
        }


    }

    onResetPassword(id) {

        if(this.myForm2.valid) {
            const data = {
                customerId: id,
                newPassword: this.myForm2.value.newPassword
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
        else {
            this.validateAllFormFields(this.myForm2);
        }
        
    }

}
