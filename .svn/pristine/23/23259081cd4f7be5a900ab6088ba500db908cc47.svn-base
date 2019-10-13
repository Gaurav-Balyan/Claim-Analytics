import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeverityService {

  constructor(private httpClient: HttpClient) { }

  fetchSeverity(url): Observable<any> {
    return this.httpClient.get(url);
  }  
}
