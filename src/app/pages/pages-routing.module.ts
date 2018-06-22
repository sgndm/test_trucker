import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

// customers
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { CurrentCustomersComponent } from './customers/current-customers/current-customers.component';
import { CustomerComponent } from './customers/customer/customer.component';

// material
import { CreateMaterialsComponent } from './materials/create-materials/create-materials.component';
import { UpdateMaterialsComponent } from './materials/update-materials/update-materials.component';

// settings
import { SettingsComponent } from './settings/settings/settings.component';
import { EmployeeComponent } from './settings/employee/employee.component';
import { CurrentEmployeesComponent } from './settings/current-employees/current-employees.component';
import { CreateEmployeesComponent } from './settings/create-employees/create-employees.component';


import { DumpCompaniesComponent } from './admin-pages/dump-companies/dump-companies.component';

const routes: Routes = [
    // loader history
    { path: '', redirectTo: 'history/th-week' },
    { path: 'history/th-week', component: ThWeekComponent },
    { path: 'history/th-week/job/:id', component: JobComponent },
    { path: 'history/th-year', component: ThYearComponent },
    { path: 'history/th-complete', component: ThCompleteComponent },
    { path: 'history/dsh-week', component: DshWeekComponent },
    { path: 'history/dsh-week/site/:id', component: SiteComponent },
    { path: 'history/dsh-week/job/:id', component: JobComponent },
    { path: 'history/dsh-year', component: DshYearComponent },
    { path: 'history/dsh-complete', component: DshCompleteComponent },
    { path: 'history/trucker/:id', component: TruckerComponent },

    // project
    { path: 'projects/today', component: TodayComponent },
    { path: 'projects/today/job/:id', component: PJobComponent },
    { path: 'projects/upcoming', component: UpcomingComponent },
    { path: 'projects/upcoming/job/:id', component: PJobComponent },
    { path: 'projects/past', component: HistoryComponent },
    { path: 'projects/past/date/:id', component: PDayComponent },
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



];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
