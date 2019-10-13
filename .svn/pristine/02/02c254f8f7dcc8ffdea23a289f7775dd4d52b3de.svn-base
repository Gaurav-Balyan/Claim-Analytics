import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { MenuListItemComponent } from '../components/dashboard/sidenav/menu-list-item/menu-list-item.component';
import * as _ from 'lodash';

import { CHILDREN } from '../shared/constants';
import { NavService } from '../services/nav.service';
import { flattenItems } from 'src/app/helpers/utility/common-functions';

@Directive({
  selector: '[appNavSelection]'
})
export class NavSelectionDirective {
  constructor(private menuListComponent: MenuListItemComponent, private navService: NavService) { }

  @Input() set ItemValue(item) {
    console.log('this.navService.skipDefault.value', this.navService.skipDefault.value);
    const isDefaultOverridden = this.navService.skipDefault.value;

    // _.forEach(item, (fItem) => {
    //   if(item.children && item.children.length){

    //   } else {
    //     const defaultNavItem = item.find(individualItem => individualItem.defaultComp);
    //   }
    // });

    // To-Do
    if (isDefaultOverridden) {
      if (item.componentId === 1) {
        this.menuListComponent.onItemSelected(item);
      } else {
        if (item.children && item.children.length) {
          // Flatten the items and look if an item with default option exists
          const oldNavItem = flattenItems(item.children, CHILDREN).find(
            individualItem => individualItem.menuLinkId === isDefaultOverridden
          );
          if (oldNavItem) {
            this.menuListComponent.onItemSelected(item);
            this.menuListComponent.onItemSelected(oldNavItem);
          }
        }
      }
    } else {
      // To-Do
      if (item.componentId === 1) {
        this.menuListComponent.onItemSelected(item);
      } else {
        if (item.children && item.children.length) {
          // Flatten the items and look if an item with default option exists
          const defaultNavItem = flattenItems(item.children, CHILDREN).find(
            individualItem => individualItem.defaultComp
          );
          if (defaultNavItem) {
            this.menuListComponent.onItemSelected(item);
            this.menuListComponent.onItemSelected(defaultNavItem);
          }
        }
      }
    }
  }
}
