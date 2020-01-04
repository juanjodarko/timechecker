import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      subdomain: ['', Validators.required],
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.signup(this.f.name.value, this.f.subdomain.value, { email: this.f.email.value, first_name: this.f.first_name.value, last_name: this.f.last_name.value, password: this.f.password.value, password_confirmation: this.f.password_confirmation.value }).subscribe(data => {
      console.log(data);
      if (data) {
        this.router.navigate(['admin-dashboard']);
      } else {
        this.router.navigate(['employee-dashboard']);
      }
      this.alertService.success('Welcome', true);
    }, error => {
      this.error = error;
      console.log(this.error);
      this.loading = false;
      this.alertService.error(this.error);
    });
  }

}
