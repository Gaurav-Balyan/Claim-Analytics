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
export class UserService {
  private rootUrl = '';

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  getUserClaims() {
    return this.http.get(this.rootUrl + '/api/GetUserClaims');
  }

  powerBIDetails(reportId): Observable<any> {
   // const url =
      'http://localhost:4132/api/PowerBI/getDashboardEmbedToken?username=shailendra.shaunak@digitangle-india.com&roles=null';
      const url = 'http://localhost:4132/api/PowerBI/getDashboardEmbedToken?username=shailendra.shaunak@digitangle-india.com&roles=null&pbiReportId='+ reportId;
      const reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-urlencoded'
    });
    return this.http.get(url, { headers: reqHeader });
  }
}
