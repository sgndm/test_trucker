import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project components
import { TodayComponent } from './projects/today/today.component';
import { UpcomingComponent } from './projects/upcoming/upcoming.component';
import { HistoryComponent } from './projects/history/history.component';
import { PJobComponent } from './projects/p-job/p-job.component';

// customers
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { CurrentCustomersComponent } from './customers/current-customers/current-customers.component';
import { CustomerComponent } from './customers/customer/customer.component';

// material
import { CreateMaterialsComponent } from './materials/create-materials/create-materials.component';
import { UpdateMaterialsComponent } from './materials/update-materials/update-materials.component';

// settings
import { EmployeeComponent } from './settings/employee/employee.component';
import { CurrentEmployeesComponent } from './settings/current-employees/current-employees.component';
import { CreateEmployeesComponent } from './settings/create-employees/create-employees.component';

// admin
import { DumpCompaniesComponent } from './admin-pages/dump-companies/dump-companies.component';
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


const routes: Routes = [

    // project
    { path: 'projects/today', component: TodayComponent },
    { path: 'projects/today/job/:id', component: PJobComponent },
    { path: 'projects/upcoming', component: UpcomingComponent },
    { path: 'projects/upcoming/job/:id', component: PJobComponent },
    { path: 'projects/past', component: HistoryComponent },
    { path: 'projects/past/job/:id', component: PJobComponent },

    // customer
    { path: 'customers/new', component: NewCustomerComponent },
    { path: 'customers/current', component: CurrentCustomersComponent },
    { path: 'customers/current/customer/:id', component: CustomerComponent },

    // material
    { path: 'material/create', component: CreateMaterialsComponent },
    { path: 'material/update', component: UpdateMaterialsComponent },

    // settings
    { path: 'employees', component: CurrentEmployeesComponent },
    { path: 'employees/create', component: CreateEmployeesComponent },
    { path: 'employees/employee/:id', component: EmployeeComponent },

    // admin 
    { path: 'admin/dump-companies', component: DumpCompaniesComponent },
    { path: 'admin/dump-companies/company/:id', component: CompanyComponent },

    // trucker 
    { path: 'trucker/jobs/today', component: TodayJobsComponent },
    { path: 'trucker/jobs/upcoming', component: UpcomingJobsComponent },
    { path: 'trucker/jobs/past', component: PastJobsComponent },
    { path: 'trucker/jobs/today/job/:id', component: TJobComponent },
    { path: 'trucker/jobs/upcoming/job/:id', component: TJobComponent },
    { path: 'trucker/jobs/past/job/:id', component: TJobComponent },

    // loader
    { path: 'loader/dump-history/th-week', component: LoaderDashboardComponent },
    { path: 'loader/dump-history/th-year', component: DupmThisYearComponent },
    { path: 'loader/dump-history/complete', component: DupmCompleteComponent },
    { path: 'loader/dump-history/th-week/company/:name', component: CompanyThisWeekComponent },
    

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
