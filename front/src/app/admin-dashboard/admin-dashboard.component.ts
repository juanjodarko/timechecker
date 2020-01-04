import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  baseUrl = environment.endpoint;
  data: any;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    console.log(this.isAdmin());
  }

  userCantCheckIn() {
    const user = this.authService.currentUserValue.user;
    return user['has_checkedin_today?'];
  }

  userCantCheckOut() {
    const user = this.authService.currentUserValue.user;
    return user['has_checkedout_today?'];
  }

  isAdmin() {
    const user = this.authService.currentUserValue.user;
    return user.roles.filter(x => x.name === 'admin');
  }

  report() {
    this.http.get(`${this.baseUrl}/report`).subscribe(data => {
      this.data = data;
    });
  }

  checkins(data) {
    return data.filter(x => x.type === 'Checkin');
  }

  checkouts(data) {
    return data.filter(x => x.type === 'Checkout');
  }



  checkin() {
    const user = this.authService.currentUserValue.user;
    console.log(user);
    this.http.post(`${this.baseUrl}/checkins`, { user_id: user.id, registrar_id: user.id, time: (new Date).toJSON() }).subscribe(data => {
      console.log(data);
    });
  }

  checkout() {
    const user = this.authService.currentUserValue.user;
    this.http.post(`${this.baseUrl}/checkouts`, {user_id: user.id, registrar_id: user.id, time: (new Date).toJSON() }).subscribe(data => {
      console.log(data);
    });
  }

  logout() {
    this.authService.logout();
  }

}
