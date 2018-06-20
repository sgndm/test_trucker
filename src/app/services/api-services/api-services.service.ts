import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from 'selenium-webdriver/http';

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

	// sign up 
	signUp(data) {

		const formData: FormData = new FormData();
		formData.append('dump_company_details', JSON.stringify(data.dupmCompany));
		formData.append('dump_site_details', JSON.stringify(data.dumpSite));
		formData.append('dump_user_details', JSON.stringify(data.dumpUser));

		const url = SERVER_URL + 'register/dumpcompany';
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


	/// company / owner 

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


}
