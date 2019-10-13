import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ROLELIST, USERLIST, GETACCOUNTFORJPA, GETUSERBYID, ADDROLEURL, ADDUSER, USERPRIVILEGECOMPONENTLIST,
  GETALLJPA, GETUSERROLES, GETROLEBYID,ACTIVATEROLE,ACTIVATEUSER
} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  fetchUser(userData): Observable<any> {
    return this.httpClient.post(USERLIST, userData);
  }

  fetchGetAccountsForJPAs(userData): Observable<any> {
    return this.httpClient.post(GETACCOUNTFORJPA, userData);
  }

  fetchUserById(userData): Observable<any> {
    return this.httpClient.post(GETUSERBYID, userData);
  }

  addUser(userData): Observable<any> {
    return this.httpClient.post(ADDUSER, userData);
  }

  fetchJPA(clientName): Observable<any> {
    return this.httpClient.post(GETALLJPA, clientName);
  }

  activateUser(userData): Observable<any> {
    // To-Do
    return this.httpClient.post(ACTIVATEUSER, userData);
  }

  fetchRole(userData): Observable<any> {
    return this.httpClient.post(ROLELIST, userData);
  }

  fetchUserRole(url): Observable<any> {
    return this.httpClient.get(url);
  }

  fetchRoles(userData): Observable<any> {
    return this.httpClient.post(GETUSERROLES, userData);
  }

  fetchUserPrivilegeComponent(userData): Observable<any> {
    return this.httpClient.post(USERPRIVILEGECOMPONENTLIST, userData);
  }

  fetchRoleById(userData): Observable<any> {
    return this.httpClient.post(GETROLEBYID, userData);
  }

  post(data): Observable<any> {
    return this.httpClient.post(ADDROLEURL, data)
  }

  userPost(data): Observable<any> {
    return this.httpClient.post(ADDUSER, data)
  }

  activateRole(userData): Observable<any> {
    // To-Do
    return this.httpClient.post(ACTIVATEROLE, userData);
  }
}
