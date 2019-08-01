import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../shared/models/user.model';
import { ClientDetails } from 'src/app/shared/models/client-details.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  clientDetails: ClientDetails;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getClientDetails();
  }

  // Needed resolver to prevent route being loaded before receiving client data
  getClientDetails() {
    this.route.data.subscribe(({ data }) => {
      this.clientDetails = data[0];
    });
  }

  // To-Do
  onLogin(loginForm: NgForm) {
    const username = loginForm.value.email;
    const password = loginForm.value.password;
    const userLoginData = {
      username,
      password
    };

    // Authenticate the user and set the token
    // this.authService.authenticateUser(userLoginData).subscribe(
    //   res => {
    //     console.log(res);
    //     if (res) {
    //       localStorage.setItem('ACCESS_TOKEN', 'access_token');
    //       this.router.navigateByUrl('/dashboard');
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );

    this.router.navigateByUrl('/cards');
  }
}
