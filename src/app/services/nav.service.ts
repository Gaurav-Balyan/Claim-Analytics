import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { NavItem } from 'src/app/shared/models/nav-item.model';

@Injectable()
export class NavService {
  currentUrl = new BehaviorSubject<string>(undefined);
  private selectedNavItem: NavItem;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  setSelectedNavItem(navItem: NavItem) {
    this.selectedNavItem = navItem;
  }

  getSelectedNavItem() {
    // return the items of object not the reference
    return { ...this.selectedNavItem };
  }
}
