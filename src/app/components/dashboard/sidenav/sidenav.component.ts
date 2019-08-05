import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  navItems: any;

  constructor(private http: HttpClient, private authService: NavService) {}

  ngOnInit() {
    this.authService.getMenu().subscribe(res => {
      this.navItems = res.navItems;
    });
  }
}
