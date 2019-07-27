import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  opened = true;

  constructor() { }

  ngOnInit() {
  }

  toggleSideNavBar(toggleFlag) {
    console.log("toggleFlag", toggleFlag);
    this.opened = toggleFlag;
  }

}
