import { Injectable } from '@angular/core';
import { UserLogin } from '../shared/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:4132/Token';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}
  /* login(data): Observable<any> {
    return this.http.post<any>(this.url, data, httpOptions).pipe(
      tap((result) => this.save_token(result)),
      catchError(this.handleError<any>('login'))
    );
  } */

  getMenu() {
    return this.http.get(`https://APIEndpoint/getMenu`);
  }

  authenticateUser(userLoginData: UserLogin) {
    console.log('userLoginData', userLoginData);
    return this.http.post(this.url, userLoginData, this.httpOptions);
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     return of(result as T);
  //   };
  // }

  // private save_token(data) {
  //   if (data.success) {
  //     localStorage.setItem('token', data.token);
  //     return;
  //   }
  // }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
