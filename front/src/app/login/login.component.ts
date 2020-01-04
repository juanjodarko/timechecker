import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../alert/alert.service';

import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    if (this.authService.currentUserValue) {
      if (this.authService.isAdmin) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/employee-dashboard']);
      }
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.f.email.value, this.f.password.value).pipe(first()).subscribe(data => {
      if (true) {
        this.router.navigate(['admin-dashboard']);
      } else {
        this.router.navigate(['employee-dashboard']);
      }
      this.alertService.success('Welcome back!', true);
    }, error => {
      this.error = error;
      console.log(this.error);
      this.loading = false;
    });
  }

}
