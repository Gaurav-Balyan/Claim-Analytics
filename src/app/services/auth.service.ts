import { Injectable } from '@angular/core';
import { UserLogin } from '../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NavItem } from '../shared/models/nav-item.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:85/api/login';

  constructor(private http: HttpClient) {}

  authenticateUser(userLoginData: UserLogin): Observable<any> {
    return this.http.post(this.url, userLoginData);
  }

  forgetPassword(email: string){
    // To-Do
    return of(1,2,3,4,5);
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
