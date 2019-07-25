import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/risk-management/overview/overview.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Fake Backend
import { FakeBackendInterceptor } from './helpers/fake-backend';

// Guards
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ForgotPasswordComponent,
    LoginComponent,
    OverviewComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
