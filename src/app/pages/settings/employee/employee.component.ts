import { Component, OnInit } from '@angular/core';
// import routes
import { Router, ActivatedRoute } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';


@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

    public employee_id: any;
    public employee_name: '';
    public company_name: '';

    public admin_per: boolean;
    public finance_per: boolean;
    public field_per: boolean;

    public access_token = '';

    public permission_arr: any[];


    constructor(
        private activeRoute: ActivatedRoute,
        public router: Router,
        private apiServices: ApiServicesService,
    ) {
        this.activeRoute.params.subscribe(
            params => {
                this.employee_id = params.id;
                console.log(params);
            }

        );

        this.access_token = localStorage.getItem('access_token')

    }

    ngOnInit() {
        this.getCompanyName(this.access_token);

        this.getCurrentEmployees(this.access_token);
    }

    // get company name
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
    
    getCurrentEmployees(token) {
        this.apiServices.getCurrentEmployees(token).subscribe(
            (res: any) => {

                console.log(res);
                if ((res.status == "successful") && (res.message == "dump_employees")) {

                    let tempArr= [];

                    for (let data of res.dump_employees) {
                        if(data.id == parseInt(this.employee_id)) {

                            this.employee_name = data.name;

                            this.admin_per = data.dumpEmployeePermission.administrationPermission;
                            this.finance_per = data.dumpEmployeePermission.financialPermission;
                            this.field_per = data.dumpEmployeePermission.fieldPermission;

                            tempArr = [{
                                admin: this.admin_per,
                                finance: this.finance_per,
                                field: this.field_per
                            }]
                            
                        }
                    }

                    this.permission_arr = tempArr;

                }

            },
            err => { 
                console.log(err)
            }
        )
    }

    onSavePermissions() {
        const data = {
            u_id: this.employee_id,
            admin: this.permission_arr[0].admin,
            finance: this.permission_arr[0].finance,
            field: this.permission_arr[0].field
        }

        this.apiServices.updatePermission(data, this.access_token).subscribe(
            (res: any) => {
                console.log(res);

                if((res.status == "successful") && (res.message == "dump_employee_permissions_updated")) {
                    this.apiServices.altScc('Permissions Updated Successfully', this.apiServices.reload());
                    
                }
            },
            err => {
                console.log(err);
            }
        )

    }

    change_permission(type, status) {
        let permission = this.permission_arr[0];

        permission[type] = status;

        if(type == 'admin') { this.admin_per = status };
        if(type == 'finance') {this.finance_per = status};
        if(type == 'field') {this.field_per = status};

        console.log(this.permission_arr);
    }


}
