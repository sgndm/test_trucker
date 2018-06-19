import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// fullcalendar
import { FullCalendarModule } from 'ng-fullcalendar';

// datatables
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

// loader history components
import { ThWeekComponent } from './trucking-history/th-week/th-week.component';
import { ThYearComponent } from './trucking-history/th-year/th-year.component';
import { ThCompleteComponent } from './trucking-history/th-complete/th-complete.component';
import { DshWeekComponent } from './dump-site-history/dsh-week/dsh-week.component';
import { DshYearComponent } from './dump-site-history/dsh-year/dsh-year.component';
import { DshCompleteComponent } from './dump-site-history/dsh-complete/dsh-complete.component';
import { TruckerComponent } from './trucker/trucker.component';
import { JobComponent } from './job/job.component';
import { SiteComponent } from './site/site.component';

// project components
import { TodayComponent } from './projects/today/today.component';
import { UpcomingComponent } from './projects/upcoming/upcoming.component';
import { HistoryComponent } from './projects/history/history.component';
import { PJobComponent } from './projects/p-job/p-job.component';
import { PDayComponent } from './projects/p-day/p-day.component';
import { PMonthComponent } from './projects/p-month/p-month.component';
import { PYearComponent } from './projects/p-year/p-year.component';

// customer
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { CurrentCustomersComponent } from './customers/current-customers/current-customers.component';
import { CustomerComponent } from './customers/customer/customer.component';

// material
import { MaterialsComponent } from './materials/materials.component';

// settings
import { PermissionsComponent } from './settings/permissions/permissions.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { EmployeeComponent } from './settings/employee/employee.component';
import { DumpCompaniesComponent } from './admin-pages/dump-companies/dump-companies.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    FullCalendarModule,
    NgxDatatableModule
  ],
  declarations: [
    DashboardComponent,
    UsersComponent,
    ThWeekComponent,
    ThYearComponent,
    ThCompleteComponent,
    DshWeekComponent,
    DshYearComponent,
    DshCompleteComponent,
    TruckerComponent,
    JobComponent,
    SiteComponent,
    TodayComponent,
    UpcomingComponent,
    HistoryComponent,
    PJobComponent,
    PDayComponent,
    PMonthComponent,
    PYearComponent,
    NewCustomerComponent,
    CurrentCustomersComponent,
    CustomerComponent,
    MaterialsComponent,
    PermissionsComponent,
    SettingsComponent,
    EmployeeComponent,
    DumpCompaniesComponent
  ]
})
export class PagesModule { }
