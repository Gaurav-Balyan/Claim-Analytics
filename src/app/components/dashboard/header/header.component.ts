import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter();
  showSidenav = true;

  constructor() {}

  ngOnInit() {}

  onHeaderClick() {
    this.showSidenav = !this.showSidenav;
    this.toggleSideNav.emit(this.showSidenav);
  }
}
