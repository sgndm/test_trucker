import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// fullcalendar
import { FullCalendarModule } from 'ng-fullcalendar';

// sweet alerts 
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

// datatables
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PagesRoutingModule } from './pages-routing.module';

// project components
import { TodayComponent } from './projects/today/today.component';
import { UpcomingComponent } from './projects/upcoming/upcoming.component';
import { HistoryComponent } from './projects/history/history.component';
import { PJobComponent } from './projects/p-job/p-job.component';

// customer
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { CurrentCustomersComponent } from './customers/current-customers/current-customers.component';
import { CustomerComponent } from './customers/customer/customer.component';

// material
import { CreateMaterialsComponent } from './materials/create-materials/create-materials.component';
import { UpdateMaterialsComponent } from './materials/update-materials/update-materials.component';

// settings
import { EmployeeComponent } from './settings/employee/employee.component';
import { DumpCompaniesComponent } from './admin-pages/dump-companies/dump-companies.component';
import { CurrentEmployeesComponent } from './settings/current-employees/current-employees.component';
import { CreateEmployeesComponent } from './settings/create-employees/create-employees.component';
import { CompanyComponent } from './admin-pages/company/company.component';

// trucker 
import { TodayJobsComponent } from './trucker/today-jobs/today-jobs.component';
import { UpcomingJobsComponent } from './trucker/upcoming-jobs/upcoming-jobs.component';
import { PastJobsComponent } from './trucker/past-jobs/past-jobs.component';
import { TJobComponent } from './trucker/t-job/t-job.component';

// loader
import { LoaderDashboardComponent } from './loader/loader-dashboard/loader-dashboard.component';
import { CompanyThisWeekComponent } from './loader/company-this-week/company-this-week.component';
import { DupmThisYearComponent } from './loader/dupm-this-year/dupm-this-year.component';
import { DupmCompleteComponent } from './loader/dupm--complete/dupm--complete.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    FullCalendarModule,
    NgxDatatableModule,
    SweetAlert2Module,
    ReactiveFormsModule
  ],
  declarations: [
    TodayComponent,
    UpcomingComponent,
    HistoryComponent,
    PJobComponent,
    NewCustomerComponent,
    CurrentCustomersComponent,
    CustomerComponent,
    EmployeeComponent,
    DumpCompaniesComponent,
    CreateMaterialsComponent,
    UpdateMaterialsComponent,
    CurrentEmployeesComponent,
    CreateEmployeesComponent,
    CompanyComponent,
    TodayJobsComponent,
    UpcomingJobsComponent,
    PastJobsComponent,
    TJobComponent,
    LoaderDashboardComponent,
    CompanyThisWeekComponent,
    DupmThisYearComponent,
    DupmCompleteComponent
  ]
})
export class PagesModule { }
