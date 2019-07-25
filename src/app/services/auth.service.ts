import { Injectable } from '@angular/core';
import { UserLogin } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = '/login/';
  private rootUrl = '';
  constructor(private http: HttpClient) {}

  /* login(data): Observable<any> {
    return this.http.post<any>(this.url, data, httpOptions).pipe(
      tap((result) => this.save_token(result)),
      catchError(this.handleError<any>('login'))
    );
  } */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  private save_token(data) {
    if (data.success) {
      localStorage.setItem('token', data.token);
      return;
    }
  }

  public login(userInfo: UserLogin) {
    localStorage.setItem('ACCESS_TOKEN', 'access_token');
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }

  userAuthentication(userLoginData: UserLogin): Observable<any> {
    console.log('Login JSON Data in service' + JSON.stringify(userLoginData));
    let url = 'http://localhost:4132/Token';
    // var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-urlencoded'
    });
    return this.http.post(url, userLoginData, { headers: reqHeader });
    // .map((response: Response) => <any>response.json())
    //   .catch(this.handleError);
  }

  /* resetPasswordInit(email: string) { 
    return this.afAuth.auth.sendPasswordResetEmail(
      email,
      { url: 'http://localhost:4200/auth' }); 
    } */
}
