import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  constructor(private httpClient: HttpClient) { }

  fetchUser(url): Observable<any> {
    return this.httpClient.get(url);
  }
  Post(url, data): Observable<any> {
    console.log("Post Data", data)
    return this.httpClient.post(url, data)
  }
}
