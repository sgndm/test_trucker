import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', redirectTo: 'history/th-week' },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'users', component: UsersComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'permissions', component: PermissionsComponent },
  { path: 'history/th-week', component: ThWeekComponent },
  { path: 'history/th-year', component: ThYearComponent },
  { path: 'history/th-complete', component: ThCompleteComponent },
  { path: 'history/dsh-week', component: DshWeekComponent },
  { path: 'history/dsh-year', component: DshYearComponent },
  { path: 'history/dsh-complete', component: DshCompleteComponent },
  { path: 'history/trucker/:id', component: TruckerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
