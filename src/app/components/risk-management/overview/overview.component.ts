import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  userNameToShow: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userNameToShow = localStorage.getItem('userName');
  }

  signout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
