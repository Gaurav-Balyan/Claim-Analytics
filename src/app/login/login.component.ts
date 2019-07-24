import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private sub: any;
  loginForm: FormGroup;
  isSubmitted = false;
  userName: string;
  loginDetails: any;
  userLoginModel: UserLogin = new UserLogin();

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    /* this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }); */
  }

  // get formControls() { return this.loginForm.controls; }

   login() {
debugger;
    /* console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value);
    this.userName = this.loginForm.value.email;
    localStorage.setItem('userName', this.userName); */
    this.router.navigateByUrl('/admin');
  } 

  getUserLoginData() {
    
    this.userLoginModel.grant_type='password';
    console.log('Login Data in component' + JSON.stringify(this.userLoginModel));
    this.authService.userAuthentication(this.userLoginModel).subscribe((loginData) => {
      debugger;
      this.loginDetails = loginData;
      sessionStorage.setItem('token', this.loginDetails.access_token);
      // alert(this.sessiontoken);
      console.log('Login Data details' + JSON.stringify(this.loginDetails));
    });
  }
}
