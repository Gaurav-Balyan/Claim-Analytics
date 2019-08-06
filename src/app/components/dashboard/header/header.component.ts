import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter();
  @Input() showSidenav: boolean;
  @Input() showCard: boolean;
  showChip: boolean;
  userName: string;

  constructor(private authService, private router: Router) {}

  ngOnInit() {
    const userData = this.authService.getUserData();
    this.userName = userData['userName'];
  }

  onHeaderClick() {
    this.showSidenav = !this.showSidenav;
    this.toggleSideNav.emit(this.showSidenav);
  }

  onLogout() {
    localStorage.removeItem('ACCESS_TOKEN');
    this.router.navigate(['./login']);
  }
}
