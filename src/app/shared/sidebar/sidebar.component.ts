import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";


declare var $: any;

@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html'

})
export class SidebarComponent implements OnInit {

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
    private route: ActivatedRoute
  ) {}

  // End open close

  ngOnInit() {

    // user name
    this.user_name = "JONNYS GRADING AND EXCAVATION";

    // get sidebar menu items from routers
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);

    $(function () {
        $(".sidebartoggler").on('click', function() {
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

  ngAfterViewInit() {}


}
