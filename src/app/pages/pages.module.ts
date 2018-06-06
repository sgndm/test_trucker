import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ThWeekComponent } from './trucking-history/th-week/th-week.component';
import { ThYearComponent } from './trucking-history/th-year/th-year.component';
import { ThCompleteComponent } from './trucking-history/th-complete/th-complete.component';
import { DshWeekComponent } from './dump-site-history/dsh-week/dsh-week.component';
import { DshYearComponent } from './dump-site-history/dsh-year/dsh-year.component';
import { DshCompleteComponent } from './dump-site-history/dsh-complete/dsh-complete.component';
import { TruckerComponent } from './trucker/trucker.component';

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
    TruckerComponent
  ]
})
export class PagesModule { }
