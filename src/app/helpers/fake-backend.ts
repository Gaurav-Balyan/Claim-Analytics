import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import users from '../data/users.js';
import navItems from '../data/menu.js';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method } = request;

    // wrap in delayed observable to simulate server api call
    return (
      of(null)
        .pipe(mergeMap(handleRoute))
        // call materialize and dematerialize to ensure delay even if an error is thrown
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize())
    );

    // Endpoints mocked here for receiving data
    function handleRoute() {
      switch (true) {
        case url.endsWith('/getClientDetails') && method === 'GET':
          return getUsers();
        case url.endsWith('/getMenu') && method === 'GET':
          return getMenu();
        default: {
          // pass through any requests not handled above
          return next.handle(request);
        }
      }
    }

    function getUsers() {
      return of(new HttpResponse({ status: 200, body: users }));
    }

    function getMenu() {
      return of(new HttpResponse({ status: 200, body: navItems }));
    }
  }
}
