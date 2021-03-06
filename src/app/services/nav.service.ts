import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Subject, Observable } from 'rxjs';

import { NavItem } from 'src/app/shared/models/nav-item.model';
import { UserDetail } from 'src/app/shared/models/user-detail.model';
import { MENUURL } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  currentUrl = new BehaviorSubject<string>(undefined);
  menuChanged = new Subject<string>();
  skipDefault = new BehaviorSubject<NavItem>(undefined);

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getMenu(): Observable<any> {
    const userDetail: UserDetail = {
      userId : this.authService.getUserData('userId'),
      domain : sessionStorage.getItem('SUBDOMAIN'),
      productId : this.getProductId(),
      accountId: sessionStorage.getItem('SELECTED_ACCOUNT')
    };
    return this.http.post(`${MENUURL}`, userDetail);
  }

  setProductId(productId: string) {
    sessionStorage.setItem('PRODUCT_ID', productId);
  }

  getProductId() {
    return sessionStorage.getItem('PRODUCT_ID');
  }

  setSelectedNavItem(navItem: NavItem) {
    sessionStorage.setItem('SELECTED_NAV_ITEM', JSON.stringify(navItem));
  }

  getSelectedNavItem(): NavItem {
    return JSON.parse(sessionStorage.getItem('SELECTED_NAV_ITEM'));
  }
}
