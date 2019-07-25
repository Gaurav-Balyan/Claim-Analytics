import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientDataResolver implements Resolve<any> {
  constructor(private http: HttpClient) {}

  // Load client data before login route gets rendered
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.http.get(`https://APIEndpoint/getClientDetails`);
  }
}
