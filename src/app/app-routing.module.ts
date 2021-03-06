import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportComponent } from './components/dashboard/report/report.component';
import { CardsComponent } from './components/cards/cards.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ClaimDetailComponent } from './components/claim-detail/claim-detail.component';
import { ClaimSeverityComponent } from './components/claim-severity/claim-severity.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { UpdateRoleComponent } from './components/update-role/update-role.component'
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRoleComponent } from './components/user-role/user-role.component';

import { ClientDataResolver } from './services/client-data-resolver.service';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginComponent,
    resolve: { data: ClientDataResolver }
  },
  { path: 'terms', component: TermsAndConditionsComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'resetPassword/:token', component: ResetPasswordComponent },
  { path: 'claimDetail/:claimId/:userId', component: ClaimDetailComponent },
  { path: 'cards', component: CardsComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'report/:name', component: ReportComponent },
    { path: 'roleList', component: UserRoleComponent },
    { path: 'userList', component: UserListComponent },
    { path: 'addRole', component: AddRoleComponent },
    { path: 'updateRole/:roleId', component: UpdateRoleComponent },
    { path: 'addUser', component: AddUserComponent },
    { path: 'addUser/:userId', component: AddUserComponent },
  ]
  },
  { path: 'claim/:claimId/:userId', component: ClaimSeverityComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
