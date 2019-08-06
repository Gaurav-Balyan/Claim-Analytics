import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter();
  @Input() showSidenav: boolean;
  @Input() showCard: boolean;
  userName: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const userData = this.authService.getUserData();
    this.userName = userData['userName'];
  }

  onHeaderClick() {
    this.showSidenav = !this.showSidenav;
    this.toggleSideNav.emit(this.showSidenav);
  }
}
