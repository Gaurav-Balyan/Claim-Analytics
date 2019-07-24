import { Injectable } from '@angular/core';
import { UserLogin } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map'; import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { catchError, tap } from 'rxjs/internal/operators';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private rootUrl = '';

    constructor(private http: HttpClient) {
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          return of(result as T);
        };
      }

    getUserClaims() {

        return this.http.get(this.rootUrl + '/api/GetUserClaims');
    }

    powerBIDetails(): Observable<any> {
        debugger;
        // console.log('Power BI JSON Data in service' + JSON.stringify(userLoginData));
        //let url = 'http://localhost:4132/api/PowerBI/getDashboardEmbedToken?username=dev@digitangleinc.com&roles=null';
        //let url = 'http://localhost:4132/api/PowerBI/getDashboardEmbedToken';
        let url = 'http://localhost:4132/api/PowerBI/getDashboardEmbedToken?username=shailendra.shaunak@digitangle-india.com&roles=null';
        // var data = "username=" + userName + "&password=" + password + "&grant_type=password";
        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded' });
        reqHeader.append("Authorization", "Bearer " + sessionStorage.getItem('token'));
        return this.http.get(url, { headers: reqHeader });
        /* .map((response: Response) => <any>response.json())
          .catch(this.handleError); */
      }

}