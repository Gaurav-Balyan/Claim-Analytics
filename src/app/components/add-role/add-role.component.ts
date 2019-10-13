import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalPopupComponent } from 'src/app/shared/modal.popup';

import { userRoleList } from 'src/app/models/userRoleList';
import { AuthService } from 'src/app/services/auth.service';
import { NavService } from 'src/app/services/nav.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  userrolelist: userRoleList;
  userRoletForm: any;
  roleComponent: any;
  statusMessage: any;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private navService: NavService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.InitialProductItem();
    this.getUserPrivilegeComponent();
  }

  getUserPrivilegeComponent() {
    //const productId = this.navService.getProductId();
    const userData = {
      clientName: sessionStorage.getItem('SUBDOMAIN'),
      prodId: this.navService.getProductId()
    }
    this.userService.fetchUserPrivilegeComponent(userData)
      .subscribe((res: any) => {
        this.userrolelist = res;
        this.roleComponent = this.userrolelist.roleResponse;
      });
  }

  InitialProductItem() {
    this.userRoletForm = this.fb.group({
      roleName: [],
      roleDesc: [],
      roleId: [],
      clientName: sessionStorage.getItem("SUBDOMAIN"),
      loggedInUser: this.authService.getUserData('userId')
    });
  }

  ParrentSelect(event, obj, type) {
    if (event.target.checked) {
      for (let i = 0; i < this.roleComponent.length; i++) {
        if (this.userrolelist.roleResponse[i].componentId === obj.componentId) {
          this.userrolelist.roleResponse[i].permission = type;
        }
      }
    }

    // if (event.target.checked) {
    //   if (type == "R") {
    //     for (let i = 0; i < this.roleComponent.length; i++) {
    //       if (this.userrolelist.roleResponse[i].componentId === obj.componentId) {
    //         this.userrolelist.roleResponse[i].permission = type;
    //       }
    //     }
    //   }
    //   else if (type == "W") {
    //     for (let i = 0; i < this.roleComponent.length; i++) {
    //       if (this.userrolelist.roleResponse[i].componentId === obj.componentId) {
    //         this.userrolelist.roleResponse[i].permission = type;
    //       }
    //     }
    //   }
    //   else if (type == "P") {
    //     for (let i = 0; i < this.roleComponent.length; i++) {
    //       if (this.userrolelist.roleResponse[i].componentId === obj.componentId) {
    //         this.userrolelist.roleResponse[i].permission = type;
    //       }
    //     }
    //   }
    // }
  }

  SaveUserRole() {
    if (this.userRoletForm.valid) {
      debugger;
      this.userrolelist.roleName = this.userRoletForm.value.roleName;
      this.userrolelist.roleDesc = this.userRoletForm.value.roleDesc;
      this.userrolelist.clientName = this.userRoletForm.value.clientName;
      this.userrolelist.roleId = this.userRoletForm.value.roleId;
      this.userrolelist.statusActive = "1";
      this.userrolelist.loggedInUser = this.userRoletForm.value.loggedInUser;
      this.userService.post(this.userrolelist)
        .subscribe(data => {
          if (data.OK) {
            const saveMessage = this.dialog.open(ModalPopupComponent, {
              data: {
                message: 'Data has been saved successfully',
                btnOk: 'OK'
              }
            });
            saveMessage.afterClosed().subscribe(result => {
              //this.navService.menuChanged.next();
              this.router.navigate(['/dashboard/roleList']);
            });
          } else {
            this.statusMessage = data.message;
          }
        })
    }
  }

  cancelBtn() {
    this.router.navigate(["/dashboard/roleList"]);
  }
}
