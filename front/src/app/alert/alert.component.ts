import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  alerts: Alert[];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        this.alerts = [];
        return;

      }
      this.alerts.unshift(alert);
      setTimeout(() => this.removeAlert(alert), 8000);
    });
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssMargin(i) {
    return 'up-space-' + i;
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    switch (alert.type) {
      case AlertType.Success:
        return 'bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative';
      case AlertType.Error:
        return 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative';
      case AlertType.Info:
        return 'bg-indigo-100 border border-indigo-400 text-indigo-700 px-4 py-3 rounded relative';
      case AlertType.Warning:
        return 'bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded relative';
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
