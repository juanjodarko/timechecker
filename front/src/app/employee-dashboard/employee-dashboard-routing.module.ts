import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeDashboardComponent } from './employee-dashboard.component';

import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDashboardRoutingModule {}
