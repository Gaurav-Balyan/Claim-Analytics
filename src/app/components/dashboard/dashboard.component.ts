import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  opened = true;

  constructor() {}

  ngOnInit() {}

  onToggleSideNavBar(showSidenav) {
    this.opened = showSidenav;
  }

  ngOnDestroy() {
    sessionStorage.removeItem('SELECTED_ACCOUNT');
  }
}
