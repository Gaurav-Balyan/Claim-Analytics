import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter();
  @Input() showSidenav: boolean;
  @Input() showCard: boolean;

  constructor() {}

  ngOnInit() {}

  onHeaderClick() {
    this.showSidenav = !this.showSidenav;
    this.toggleSideNav.emit(this.showSidenav);
  }
}
