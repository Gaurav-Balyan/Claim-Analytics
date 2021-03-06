import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { CLIENTBRANDING } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientDataResolver implements Resolve<any> {
  // environment: any;
  constructor(private http: HttpClient) { }

  // Load client data before login route gets rendered
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // Fetch the subdomain from the URL
    const subdomain = window.location.host.split('.')[0];
    // stirng [qa,uat]
    // qaadminsure.klearai.com    = qaadminsure.find().splice(2)
    // uatadminsure.klearai.com
    // adminsure.klearai.com
    const strArray = ['qa', 'uat'];
    // let domain = 'qaadminsure.klearai.com'.split('.')[0];
    const environment: any = this.getEnvironmentName(subdomain, strArray);
    // _.forEach(environmentArray, (env) => {
    //   if (_.includes(domain, env)) {
    //     environment = env;
    //     return false;
    //   }
    // });
    const clientName = subdomain.replace(environment, '');

    // To-Do
    if (_.includes(subdomain, 'localhost')) {
      sessionStorage.setItem('SUBDOMAIN', 'adminsure');
    } else {
      sessionStorage.setItem('SUBDOMAIN', clientName);
    }

    const data = {
      clientName: sessionStorage.getItem('SUBDOMAIN')
    };
    return this.http.post(CLIENTBRANDING, data);
  }

  getEnvironmentName(str: string, strArray: string[]) {
    for (let j = 0; j < strArray.length; j++) {
      if (str.includes(strArray[j])) {
        return strArray[j];
      }
    }
    return -1;
  }
}
