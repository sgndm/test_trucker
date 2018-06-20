import { Component, OnInit, ViewChild } from '@angular/core';


import { Router } from '@angular/router';

import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
    selector: 'app-p-month',
    templateUrl: './p-month.component.html',
    styleUrls: ['./p-month.component.css']
})
export class PMonthComponent implements OnInit {

    calendarOptions: Options;
    public data : any[];
    public company_name : string = '';

    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

    constructor(
        public router: Router,
    ) {}

    ngOnInit() {
        this.company_name = "Chandlers Landfill";
        this.data = [
            { title: '1', start: '2018-06-06', 'e_id': 1 }
        ];
        this.calendarOptions = {
            editable: false,
            eventLimit: false,
            height: 550,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            events: this.data,
            eventColor: '#00D59C',
            eventTextColor: '#ffffff',
            eventRender: function( event, element, view ) {
                element.find('.fc-day-grid-event').removeClass('fc-day-grid-event'); 
         }
        };
    }

    eventClick(data) {
        // console.log(data.event);
        let e_id = data.event.e_id;

        this.router.navigate(['/pages/projects/upcoming/date', e_id]);
    }

}
