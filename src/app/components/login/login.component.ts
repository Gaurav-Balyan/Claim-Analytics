import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDetails: any;
  ClientDetails: any;
  userLoginModel: UserLogin = new UserLogin();

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Needed resolver to prevent route being loaded before receiving client data
    this.route.data.subscribe(({ data }) => {
      this.ClientDetails = data[0];
    });
  }

  // To-Do
  login() {
    this.router.navigateByUrl('/admin');
  }

  // To-Do
  getUserLoginData() {
    this.userLoginModel.grant_type = 'password';
    this.authService
      .userAuthentication(this.userLoginModel)
      .subscribe(loginData => {
        this.loginDetails = loginData;
        sessionStorage.setItem('token', this.loginDetails.access_token);
      });
  }
}
