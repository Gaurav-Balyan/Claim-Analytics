import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityService } from 'src/app/services/security.service';
import { MatDialog } from '@angular/material';
import { ModalPopupComponent } from 'src/app/shared/modal.popup';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {
  userRole: any;
  selectedRoles: number[] = [];
  rolesForActivation:string;

  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService,
              private securityService: SecurityService, private dialog: MatDialog, ) { }

  ngOnInit() {
    this.getUserRole();
  }

  getUserRole() {
    const userData = {
      clientName: sessionStorage.getItem('SUBDOMAIN'),
      userId: this.authService.getUserData('userId')
    }
    this.userService.fetchRole(userData).subscribe(res => {
      this.userRole = res.GetRoleList;
    })
  }

  checkUserRole(roleId) {
    if (!_.includes(this.selectedRoles, roleId)) {
      this.selectedRoles.push(roleId);
    } else {
      _.remove(this.selectedRoles, id => {
        return id === roleId;
      });
    }
    if (this.selectedRoles.length > 0)
      this.rolesForActivation = this.selectedRoles.join(',');
    
    
    //  this.rolesForActivation = this.selectedRoles.join(',');
    console.log(this.selectedRoles);
  }

  editRole(roleId) {
    const encryptedUserId = btoa(this.securityService.encrypt(roleId)).replace(/-/g, '');
    this.router.navigate(['/dashboard/updateRole/' + encryptedUserId]);
  }

  activateRole(status) {
    const activateRole = status ;//=== 'activate' ? true : false;
    const userData = {
      clientName:sessionStorage.getItem("SUBDOMAIN"),
      activate: activateRole,
      roleId: this.rolesForActivation
    };
    this.userService.activateRole(userData).subscribe((res: any) => {
      if (res.OK) {
        this.selectedRoles=[];
        this.getUserRole();
        this.router.navigate(['dashboard/roleList']);
        const saveMessage = this.dialog.open(ModalPopupComponent, {
          data: {
            message: 'Status updated successfully',
            btnOk: 'OK'
          }
        });
      }else
      {
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
