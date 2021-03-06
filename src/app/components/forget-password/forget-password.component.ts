import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  message: string;
  logo: string;
  loginError: string;

  constructor(private authService: AuthService,
              private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.logo = localStorage.getItem('CLIENT_LOGO');
  }

  onForgetPassword(form: NgForm) {
    this.loaderService.show();

    // Fetch the subdomain from the URL
    const subdomain = window.location.host.split('.')[0];
    if (_.includes(subdomain, 'localhost')) {
      sessionStorage.setItem('RESETURL', subdomain);
    } else {
      sessionStorage.setItem('RESETURL', window.location.origin);
    }

    const userData = {
      userid: form.value.email,
      clientURL: sessionStorage.getItem('RESETURL'),
      clientName: sessionStorage.getItem('SUBDOMAIN')
    };

    this.authService.forgetPassword(userData).subscribe((res: any) => {
      if (res.OK) {
        this.message = res.message;
      } else {
        this.loginError = res.message;
      }
      this.loaderService.hide();
    }, (error: any) => {
      this.loaderService.hide();
      this.loginError = error.error.error_description;
    });
  }

  clearError(errorType) {
    errorType === 'message' ? this.message = '' : this.loginError = '';
  }
}
