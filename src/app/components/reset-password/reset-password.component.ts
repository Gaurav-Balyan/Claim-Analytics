import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MustMatch } from 'src/app/helpers/utility/must-match.validator';
import { ValidatePasswordPolicy } from 'src/app/helpers/utility/password-policy.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  message: string;
  logo: string;
  tokenString: string;
  userForm: FormGroup;
  loginError: string;
  clientName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    const subdomain = window.location.host.split('.')[0];
    // const subdomain = 'qaadminsure.klearai.com'.split('.')[0];
    const strArray = ['qa', 'uat'];
    const environment: any = this.getEnvironmentName(subdomain, strArray);
    this.clientName = subdomain.replace(environment, '');

    this.logo = localStorage.getItem('CLIENT_LOGO');
    this.activatedRoute.params.subscribe(params => {
      this.tokenString = params.token;
    });
    this.userForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, ValidatePasswordPolicy]],
        // password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
    this.loaderService.hide();
  }

  getEnvironmentName(str: string, strArray: string[]) {
    for (let j = 0; j < strArray.length; j++) {
      if (str.includes(strArray[j])) {
        return strArray[j];
      }
    }
    return -1;
  }

  // convenience getter for easy access to form fields
  get form_control() {
    return this.userForm.controls;
  }

  onResetPassword() {
    if (this.userForm.valid) {
      this.loaderService.show();
      const newPass = this.userForm.get('password').value;
      const token = this.tokenString;
      const clientName = this.clientName;
      const userData = {
        newPass,
        token,
        clientName
      };

      this.authService.resetPassword(userData).subscribe((res: any) => {
        if (res.OK) {
          //To-Do
          // Will also get a flag here for terms and if true will redirect to terms page can save data in a service using getter and setter
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
  }

  clearError(errorType) {
    errorType === 'message' ? this.message = '' : this.loginError = '';
  }
}
