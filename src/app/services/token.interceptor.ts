// // create this file
import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpResponse,
	HttpErrorResponse,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';




@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	public access_token = '';

	constructor(
	) {
		this.access_token = localStorage.getItem('access_token')
	}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		console.log('access_token : ' + this.access_token);

		if (this.access_token) {
			request = request.clone({
				setHeaders: {
					'X-AUTH-TOKEN': `${this.access_token}`

				}
			})
			console.log(request);
			return next.handle(request);
			
		} else {
			console.log(request);
			return next.handle(request);
		}
		

	}
}
