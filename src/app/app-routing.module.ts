import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientDataResolver } from './services/client-data-resolver.service';
import { ReportComponent } from './components/dashboard/report/report.component';
import { AuthGuard } from './guards/auth.guard';
import { CardsComponent } from './components/cards/cards.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginComponent,
    resolve: { data: ClientDataResolver }
  },
  { path: 'cards', component: CardsComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'report/:name', component: ReportComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
