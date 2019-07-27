import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter();
  toggleFlag = true;

  constructor() {}

  ngOnInit() {}

  onHeaderClick() {
    this.toggleFlag = !this.toggleFlag;
    this.toggleSideNav.emit(this.toggleFlag);
  }
}
