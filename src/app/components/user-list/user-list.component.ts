import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityService } from 'src/app/services/security.service';
import { ModalPopupComponent } from 'src/app/shared/modal.popup';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: any;
  selectedUsers:  number[] = [];
  userForActivation: string;
  

  constructor(private userService: UserService,
    private authService: AuthService,
    private securityService: SecurityService,
    private router: Router,private dialog: MatDialog,) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    const userData = {
      clientName: sessionStorage.getItem('SUBDOMAIN'),
      userId: this.authService.getUserData('userId')
    }
    this.userService.fetchUser(userData).subscribe(res => {
      this.userList = res.UserList;
    })
  }

  checkUserList(userId) {
    if (!_.includes(this.selectedUsers, userId)) {
      this.selectedUsers.push(userId);
    } else {
      _.remove(this.selectedUsers, id => {
        return id === userId;
      });
    }
    
    if (this.selectedUsers.length > 0)
      this.userForActivation = this.selectedUsers.join(',');
  

    console.log(this.selectedUsers);
  }

  editUser(userId) {
    const encryptedUserId = btoa(this.securityService.encrypt(userId)).replace(/-/g, '');
    this.router.navigate(['/dashboard/addUser/' + encryptedUserId]);
  }

  activateUser(status) {
    const activateUser = status ;//=== 'activate' ? true : false;
    const userData = {
      clientName: sessionStorage.getItem("SUBDOMAIN"),
      activate: activateUser,
      userId: this.userForActivation
    };
    this.userService.activateUser(userData).subscribe((res: any) => {
      if (res.OK) {
        debugger;
        this.selectedUsers=[];
        this.getUserList();
        this.router.navigate(['dashboard/userList']);
        const saveMsg = this.dialog.open(ModalPopupComponent, {
          data: {
            message: 'Status updated successfully',
            btnOk: 'OK'
          }
        });
      } else {
        const saveMessage = this.dialog.open(ModalPopupComponent, {
          data: {
            message: 'Error occurred while updating status',
            btnOk: 'OK'
          }
        })
      }

    });
  }
}
