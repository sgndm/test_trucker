import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { PermissionsComponent } from './permissions/permissions.component';

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

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule
  ],
  declarations: [
    DashboardComponent,
    UsersComponent,
    SettingsComponent,
    PermissionsComponent,
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
    PJobComponent
  ]
})
export class PagesModule { }
