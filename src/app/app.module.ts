import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Components
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/risk-management/overview/overview.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SidenavComponent } from './components/dashboard/sidenav/sidenav.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { ReportComponent } from './components/dashboard/report/report.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuListItemComponent } from './components/dashboard/sidenav/menu-list-item/menu-list-item.component';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Fake Backend
import { FakeBackendInterceptor } from './helpers/fake-backend';
import { AuthInterceptor } from './helpers/auth-interceptor';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { NavService } from './services/nav.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ForgotPasswordComponent,
    LoginComponent,
    OverviewComponent,
    ResetPasswordComponent,
    SidenavComponent,
    HeaderComponent,
    ReportComponent,
    DashboardComponent,
    MenuListItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    // Comment this to remove fake backend
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    NavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
