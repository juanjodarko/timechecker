import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { EmployeeDashboardModule } from './employee-dashboard/employee-dashboard.module';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { AlertModule } from './alert/alert.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminDashboardModule,
    EmployeeDashboardModule,
    LoginModule,
    SignupModule,
    HttpClientModule,
    AlertModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
