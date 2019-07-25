import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/risk-management/overview/overview.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

import { ClientDataResolver } from './services/client-data-resolver.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginComponent,
    resolve: { data: ClientDataResolver }
  },
  { path: 'admin', component: AdminComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
