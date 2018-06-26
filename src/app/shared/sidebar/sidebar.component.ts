import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute, RoutesRecognized } from "@angular/router";

import { ApiServicesService } from '../../services/api-services/api-services.service';


declare var $: any;

@Component({
    selector: 'ap-sidebar',
    templateUrl: './sidebar.component.html'

})
export class SidebarComponent implements OnInit {

    public access_token = '';
    public allSideNavItems: any[];
    // public tempSideNavItems: any[];

    showMenu: string = '';
    showSubMenu: string = '';
    public sidebarnavItems: any[]; // array to store side nav menu items
    user_name: string = 'User Name';


    //this.getsideNavItems = [ 'Pages','Users', 'Dashboard', 'DropDown' ];
    //this is for the open close
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';

        } else {
            this.showMenu = element;
        }
    }
    addActiveClass(element: any) {
        if (element === this.showSubMenu) {
            this.showSubMenu = '0';

        } else {
            this.showSubMenu = element;
        }
    }

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        public apiServices: ApiServicesService
    ) {
        this.access_token = localStorage.getItem('access_token');
    }

    // End open close

    ngOnInit() {

        this.allSideNavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);

        const tempArray = [];
        let tempSideNavItems = [];

        if (this.access_token) {
            // check user 
            this.apiServices.getDetailsSetHeader(this.access_token).subscribe(
                (res: any) => {
                    console.log(res);
                    if (res.status == 'successful') {
                        // get user type 
                        let userType = res.userType;

                        switch (userType) {
                            case "WEBADMIN":
                                // tasks 
                                this.user_name = res.systemadmin.name;
                                tempSideNavItems = ['Admin Dashboard', 'Dump Companies'];

                                break;
                            case "DUMPUSER":

                                switch (res.dumpUser.dumpUserType) {
                                    case "DUMPOWNER":
                                        // task
                                        this.user_name = res.dumpUser.name;
                                        tempSideNavItems = ['Dump Site Dashboard', 'Projects', 'Customer Accounts', 'Settings And Permissions', 'Material Costs'];
                                        break;

                                    case "DUMPEMPLOYEE":

                                        if (res.dumpUser.dumpEmployeePermission.administrationPermission == true) {
                                            this.user_name = res.dumpUser.name;
                                            tempSideNavItems = ['Dump Site Dashboard', 'Projects', 'Customer Accounts', 'Settings And Permissions', 'Material Costs'];
                                            break;
                                        } else {
                                            this.user_name = res.dumpUser.name;
                                            tempSideNavItems = ['Dump Site Dashboard', 'Projects', 'Customer Accounts'];
                                            break;
                                        }

                                }

                                break;

                            case "DRIVER":
                                this.user_name = res.driver.name;
                                tempSideNavItems = ['Trucker Dashboard', 'Jobs'];
                                break;

                        }


                        // set nav items 
                        for (let x in this.allSideNavItems) {

                            let n_item = this.allSideNavItems[x]['title'];

                            // for all nav items this user is allowed
                            for (let i in tempSideNavItems) {
                                let t_item = tempSideNavItems[i];

                                // if user allowed to these pages
                                if (n_item == t_item) {
                                    tempArray.push(this.allSideNavItems[x]);
                                }

                            }
                        }


                    }
                },

                err => {
                    // location.reload();
                    console.log(err);
                }
            )


        } else {
            this.apiServices.clearLocalStorage();
            this.router.navigate(['/sign-in']);
        }


        this.sidebarnavItems = tempArray;
        //   this.sidebarnavItems =ROUTES.filter(sidebarnavItem => sidebarnavItem);


        $(function () {
            $(".sidebartoggler").on('click', function () {
                if ($("#main-wrapper").hasClass("mini-sidebar")) {
                    $("body").trigger("resize");
                    $("#main-wrapper").removeClass("mini-sidebar");

                } else {
                    $("body").trigger("resize");
                    $("#main-wrapper").addClass("mini-sidebar");
                }
            });

        });

    }


    ngAfterViewInit() {

    }


}
