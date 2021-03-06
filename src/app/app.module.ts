import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

// this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

// optional, provides moment-style pipes for date formatting
import { MomentModule } from 'angular2-moment';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CardsComponent } from './components/cards/cards.component';
import { SidenavComponent } from './components/dashboard/sidenav/sidenav.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { ReportComponent } from './components/dashboard/report/report.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuListItemComponent } from './components/dashboard/sidenav/menu-list-item/menu-list-item.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ClaimDetailComponent } from './components/claim-detail/claim-detail.component';
import { ClaimSeverityComponent } from './components/claim-severity/claim-severity.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ModalPopupComponent } from './shared/modal.popup';
import { ErrorDialogComponent } from './shared/components/error-dialog/error-dialog.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { UpdateRoleComponent } from './components/update-role/update-role.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRoleComponent } from './components/user-role/user-role.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PreviewUserComponent } from './shared/components/preview-user/preview-user.component';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Interceptors
import { FakeBackendInterceptor } from './helpers/fake-backend';
import { AuthInterceptor } from './helpers/auth-interceptor';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Directives
import { NavSelectionDirective } from './directives/nav-selection.directive';
import { PreviewRoleComponent } from './shared/components/preview-role/preview-role.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    HeaderComponent,
    ReportComponent,
    DashboardComponent,
    MenuListItemComponent,
    CardsComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ClaimDetailComponent,
    ClaimSeverityComponent,
    ModalPopupComponent,
    NavSelectionDirective,
    PageNotFoundComponent,
    ErrorDialogComponent,
    LoaderComponent,
    TermsAndConditionsComponent,
    AddRoleComponent,
    AddUserComponent,
    UserListComponent,
    UserRoleComponent,
    UpdateRoleComponent,
    PreviewUserComponent,
    PreviewRoleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMultiSelectModule,
    NgxSpinnerModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG })
  ],
  providers: [
    AuthGuard,
    // Comment this to remove fake backend
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalPopupComponent, ErrorDialogComponent, PreviewUserComponent, PreviewRoleComponent]
})
export class AppModule { }
