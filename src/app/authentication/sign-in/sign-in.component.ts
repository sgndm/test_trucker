import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../services/api-services/api-services.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  // declare variables
  public username = '';
  public password = '';

  constructor(
    public router: Router,
    private apiServices: ApiServicesService
  ) { }

  ngOnInit() {
    // check if user has already logged in

    if (this.apiServices.access_token != '') {
      // if access token is not empty
      // check user
      this.apiServices.checkLogin().subscribe(
        res => {
          // if access token is valid
          // go to dashboard
          console.log(res);
          this.goToDashboard();
        },
        err => {
          // if access token is not valid
          // clea local storage
          this.apiServices.clearLocalStorage();
          console.log(err);

        }
      )
    }
  }

  ngAfterViewInit() {
    $(function() {
        $(".preloader").fadeOut();
    });
    // $(function() {
    //     (<any>$('[data-toggle="tooltip"]')).tooltip()
    // });
    // $('#to-recover').on("click", function() {
    //     $("#loginform").slideUp();
    //     $("#recoverform").fadeIn();
    // });
  }

  onLoggedin(){

    const data = {
      u: this.username,
      p: this.password
    };

    // call the login end point
    this.apiServices.login(data).subscribe(
      res => {
        // if succeccfully loged in
        // set access token
        let token = res['access_token'];
        this.apiServices.saveToLocalStorage(token);

        //console.log(res);

        //redirect to dashboard
        this.goToDashboard();
      },

      err => {
        // if login has failed
        alert('Login Failed');
        console.log(err);
      }
    )

    console.log(data);

  }

  // redirect to dashboard
  goToDashboard() {
    this.router.navigate(['/pages']);
  }

}
