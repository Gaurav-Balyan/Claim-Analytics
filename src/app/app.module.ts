import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
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
import { CardsComponent } from './components/cards/cards.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

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
    ForgetPasswordComponent
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
