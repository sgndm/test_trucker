import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from 'selenium-webdriver/http';
import swal from 'sweetalert2';

const httpOptions = {
	// responseType: 'string'
}

const SERVER_URL = 'http://34.219.77.92:8080/truckerapp/api/';

@Injectable()
export class ApiServicesService {

	// access token
	public access_token = '';

	constructor(
		private http: HttpClient
	) {
		this.access_token = localStorage.getItem('access_token')
	}

	altScc(content, callback) {
		swal({
			type: 'success',
            title: '<span class="text-success">Success</span>',
            text: content,
            showConfirmButton: false,
            timer: 2000,
            width: 500,
            padding: 20
		}).then(
            callback
        )
	}

	altErr(content, callback) {
		swal({
            type: 'error',
            title: '<span class="text-danger">Oops..</span>',
            text: content,
            showConfirmButton: false,
            timer: 2000,
            width: 500,
            padding: 20
        }).then(
            callback
        )
	}

	altDelConfirm(callback) {
		swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                callback
            }
        })
	}

	reload(){
		window.setTimeout(function(){window.location.reload()}, 3000);
	}

	// login function
	login(data): Observable<HttpResponse> {
		// const formData: FormData = new FormData();
		// formData.append('username', data.u);
		// formData.append('password', data.p);

		const url = SERVER_URL + 'login';
		return this.http.post(url, { 'username': data.u, 'password': data.p }, { observe: 'response', responseType: 'text' });

	}

	// get user details 
	getDetailsSetHeader(token) {
		const url = SERVER_URL + 'web/current';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token } });
	}


	// save acces token in local storage
	saveToLocalStorage(token) {
		// this.access_token = token;
		localStorage.setItem('access_token', token);
	}

	// clear local storage
	clearLocalStorage() {
		localStorage.removeItem('access_token');
		// this.access_token = '';
	}

	// sign up dump site
	signUp(data) {

		const formData: FormData = new FormData();
		formData.append('dump_company_details', JSON.stringify(data.dupmCompany));
		formData.append('dump_site_details', JSON.stringify(data.dumpSite));
		formData.append('dump_user_details', JSON.stringify(data.dumpUser));

		const url = SERVER_URL + 'register/dumpcompany';
		return this.http.post(url, formData);
	}

	// get truck types
	getTruckTypesSignUp(){
		const url = SERVER_URL + 'gettrucktypes';
		return this.http.get(url);
	}

	signUpTrucker(data) {
		const formData: FormData = new FormData();
		formData.append('driver_user_details', JSON.stringify(data.user));
		formData.append('truck_type', data.truckType);

		const url = SERVER_URL + 'register/driver';
		return this.http.post(url, formData);
	}


	/// admin end points 

	// get dump companies 
	getDumpCompanies(token) {
		const url = SERVER_URL + 'admin/dumpaccounts';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token } });
	}

	// approve dump company
	approveDumpCompany(data, token) {
		const formData: FormData = new FormData();
		formData.append('dump_user_id', data.companyId);

		const url = SERVER_URL + 'admin/dumpaccount/approve';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });
	}

	// block dump company 
	blockDumpCompany(data, token) {
		const formData: FormData = new FormData();
		formData.append('dump_user_id', data.companyId);

		const url = SERVER_URL + 'admin/dumpaccount/block';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });
	}

	// get company details
	getCompanyDetailsById(data, token) {
		const url = SERVER_URL + 'admin/dumpaccount/view';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }, params: { dump_user_id: data } });
	}


	/// company / owner 

	// customer

	// get customer account details 
	getCustomerDetails(token) {
		const url = SERVER_URL + 'web/dumpcustomers';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token } });
	}

	// by id 
	getCustomerById(data, token) {
		const url = SERVER_URL + 'web/dumpcustomer';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }, params: { dump_customer_id: data } });
	}

	// get dump activity 
	getDumpActivity(data, token) {
		const url = SERVER_URL + 'web/dumpcustomer/activity';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }, params: { dump_customer_id: data } });
	}

	// create customer 
	createCustomer(data, token) {
		const formData: FormData = new FormData();
		formData.append('dump_customer_details', JSON.stringify(data.dump_customer));

		const url = SERVER_URL + 'web/register/dumpcustomer';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });
	}

	// activate dump customer
	activateCustomer(data, token) {
		const formData: FormData = new FormData();
		formData.append('dump_customer_id ', data.customerId);

		const url = SERVER_URL + 'web/dumpcustomer/activate';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });
	}

	// put customer account on hold
	putAccountOnHold(data, token) {
		const formData: FormData = new FormData();
		formData.append('dump_customer_id ', data.customerId);

		const url = SERVER_URL + 'web/dumpcustomer/onhold';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });
	}

	// delete customer 
	deleteCustomer(data, token) {
		const formData: FormData = new FormData();
		formData.append('dump_customer_id ', data.customerId);

		const url = SERVER_URL + 'web/dumpcustomer/delete';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });

	}

	// update customer 
	updateCustomer(data, token) {
		const formData: FormData = new FormData();
		formData.append('dump_customer_id', data.dump_customer_id);
		formData.append('phoneNumber', data.phoneNumber);
		formData.append('city', data.city);
		formData.append('state', data.state);
		formData.append('ssnEin', data.ssnEin);
		formData.append('streetAddress', data.streetAddress);
		formData.append('name', data.name);
		formData.append('zipcode', data.zipcode);

		const url = SERVER_URL + 'web/dumpcustomer/update';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });
	}

	// password reset 
	resetPassword(data, token) {
		const formData: FormData = new FormData();
		formData.append('dump_customer_id ', data.customerId);
		formData.append('password ', data.newPassword);

		const url = SERVER_URL + 'web/dumpcustomer/resetpassword';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });
	}


	// projects 

	// get dump sites
	getDumpSites(token) {
		const url = SERVER_URL + 'web/dumpcompany/dumpsites';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token } });
	}

	// get project counts by id 
	getProjectCountsById(data, token) {
		const url = SERVER_URL + 'web/dumpcompany/dumpsite/projects/today';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }, params: { dump_id: data } });
	}

	// get active projects for today 
	getActiveProjectsTodayById(data, token) {
		const url = SERVER_URL + 'web/dumpcompany/dumpsite/projects/today/active';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }, params: { dump_id: data } });
	}

	// get scheduled projects for today 
	getScheduledProjectsTodayById(data, token) {
		const url = SERVER_URL + 'web/dumpcompany/dumpsite/projects/today/scheduled';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }, params: { dump_id: data } });
	}

	// get project details 
	getProjectDetails(data, token) {
		const url = SERVER_URL + 'web/dumpcompany/dumpsite/projects/jobdetails';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }, params: { job_id: data } });
	}

	// get project history all
	getProjectHistoryAll(data, token) {
		const url = SERVER_URL + 'web/dumpcompany/dumpsite/projects/history';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }, params: { dump_id: data } });
	}

	// get project history all
	getProjectUpcomingAll(data, token) {
		const url = SERVER_URL + 'web/dumpcompany/dumpsite/projects/upcoming';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }, params: { dump_id: data } });
	}


	// materials 
	
	// get truck types 
	getTruckTypes(token) {
		const url = SERVER_URL + 'web/trucktypes';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }});
	}

	// get materials 
	getMaterials(token) {
		const url = SERVER_URL + 'web/materials';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }});
	}

	createMaterialFees(data, token) {
		const formData: FormData = new FormData();
		formData.append('material_id ', data.material_id);
		formData.append('fees', JSON.stringify(data.mat_fees));

		const url = SERVER_URL + 'web/dumpcompany/materialfee/create';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });
	}

	// get material fees 
	getMaterialFees(token) {
		const url = SERVER_URL + 'web/dumpcompany/materialfees';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }});
	}

	// update fees 
	updateMaterialFees(data, token) { 
		const formData: FormData = new FormData();
		formData.append('updatedFees', JSON.stringify(data.mat_fees));

		const url = SERVER_URL + 'web/dumpcompany/materialfees/update';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });
	}


	// settings 

	// current employees 
	getCurrentEmployees(token) {
		const url = SERVER_URL + 'web/dumpcompany/employees';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }});
	}

	// create employee 
	createEmployee(data, token) {
		const formData: FormData = new FormData();
		formData.append('dump_employee_details', JSON.stringify(data.employee));

		const url = SERVER_URL + 'web/dumpcompany/register/employee';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });
	}

	// update permissions
	updatePermission(data, token) {
		const formData: FormData = new FormData();
		formData.append('dump_user_id', data.u_id);
		formData.append('administrationPermission', data.admin);
		formData.append('fieldPermission', data.finance);
		formData.append('financialPermission', data.field);

		const url = SERVER_URL + 'web/dumpcompany/employee/permission/edit';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });
	}

	// delete employee
	deleteEmployee(data, token) {
		const formData: FormData = new FormData();
		formData.append('dump_user_id', data.u_id);

		const url = SERVER_URL + 'web/dumpcompany/employee/delete';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });
	}

	// on hold employee 
	onHoldEmployee(data, token) {
		const formData: FormData = new FormData();
		formData.append('dump_user_id', data.u_id);

		const url = SERVER_URL + 'web/dumpcompany/employee/block';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });
	}

	// on activate employee 
	onActivateEmployee(data, token){
		const formData: FormData = new FormData();
		formData.append('dump_user_id', data.u_id);

		const url = SERVER_URL + 'web/dumpcompany/employee/unblock';
		return this.http.post(url, formData, { headers: { 'X-AUTH-TOKEN': token } });
	}


	// trucker 

	// jobs
	// current jobs 
	getCurrentJobsTrucker(token){
		const url = SERVER_URL + 'web/driver/myjobs';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }});
	}

	getUpcomingJobsTrucker(token){
		const url = SERVER_URL + 'web/driver/myjobs';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }, params: { job_status: "UPCOMING" } });
	}

	getNewJobsTrucker(token){
		const url = SERVER_URL + 'web/driver/myjobs';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }, params: { job_status: "NEW" } });
	}

	getPastJobsTrucker(token){
		const url = SERVER_URL + 'web/driver/myjobs';
		return this.http.get(url, { headers: { 'X-AUTH-TOKEN': token }, params: { job_status: "END" } });
	}

}
