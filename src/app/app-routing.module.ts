import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// auht guard
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { AccountSelectComponent } from './authentication/account-select/account-select.component';
import { PageNotFoundComponent } from './pages/error/page-not-found/page-not-found.component';
import { CreateTruckerComponent } from './authentication/create-trucker/create-trucker.component';
import { CreateLoaderComponent } from './authentication/create-loader/create-loader.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: AccountSelectComponent },
  { path: 'sign-up/trucker', component: CreateTruckerComponent },
  { path: 'sign-up/loader', component: CreateLoaderComponent },
  { path: 'sign-up/dump-site', component: SignUpComponent },
  {
    path: 'pages',
    component: FullComponent,
    loadChildren: './pages/pages.module#PagesModule',
    // canActivate: [AuthGuardService]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
