import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { POWERBIURL } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient) {}

  // Used to fetch latest powerBIData for provided reportId
  powerBIDetails(reportId): Observable<any> {
    const url = `${POWERBIURL}getDashboardEmbedToken?username=shailendra.shaunak@digitangle-india.com&roles=null&pbiReportId=${reportId}`;
    return this.http.get(url);
  }
}
