import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalPopupComponent } from 'src/app/shared/modal.popup';

import { userRoleList } from 'src/app/models/userRoleList';
import { AuthService } from 'src/app/services/auth.service';
import { NavService } from 'src/app/services/nav.service';
import { SecurityService } from 'src/app/services/security.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-add-role',
    templateUrl: './../../components/add-role/add-role.component.html',
    styleUrls: ['./../../components/add-role/add-role.component.css']
})
export class UpdateRoleComponent implements OnInit {
    userrolelist: userRoleList;
    userRoletForm: any;
    roleComponent: any;
    statusMessage: any;

    constructor(private fb: FormBuilder, 
                private userService: UserService, 
                private router: Router,
                private authService: AuthService,
                private navService: NavService,
                private securityService: SecurityService,
                private activatedRoute: ActivatedRoute,
                private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.InitialProductItem();
        this.activatedRoute.params.subscribe((params: any) => {
            // Decrypt the parameters from the URL after converting the value using atob(ASCII to Binary)
            const decryptedClaimId = this.securityService.decrypt(atob(params.roleId));
            this.getRoleById(decryptedClaimId);
        });
    }

    getRoleById(roleId) {
        const userData = {
            clientName: sessionStorage.getItem('SUBDOMAIN'),
            prodId: this.navService.getProductId(),
            roleId: roleId
        }
        this.userService.fetchRoleById(userData)
            .subscribe((res: any) => {
                this.userrolelist = res;
                this.roleComponent = res.roleResponse;
                this.userRoletForm.patchValue({
                    roleName: res.roleName,
                    roleDesc: res.roleDesc
                });
            });
    }

    InitialProductItem() {
        this.userRoletForm = this.fb.group({
            roleName: [],
            roleDesc: [],
            statusActive: [1],
            clientName: sessionStorage.getItem("SUBDOMAIN"),
            loggedInUser: this.authService.getUserData('userId')
        });
    }

    ParrentSelect(event, item, type) {
        if (event.target.checked) {
            for (let i = 0; i < this.roleComponent.length; i++) {
                if (this.userrolelist.roleResponse[i].componentId === item.componentId) {
                    this.userrolelist.roleResponse[i].permission = type;
                }
            }
        }

    }

    SaveUserRole() {
        debugger;
        if (this.userRoletForm.valid) {
            this.userrolelist.roleName =  this.userRoletForm.value.roleName;
            this.userrolelist.roleDesc =  this.userRoletForm.value.roleDesc;
            this.userrolelist.clientName = this.userRoletForm.value.clientName;
            this.userrolelist.statusActive = this.userRoletForm.value.statusActive;
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
                            this.router.navigate(['dashboard/roleList']);
                            // To-Do
                            //this.navService.skipDefault.next(this.item.menuLinkId);
                        });
                    } else {
                        this.statusMessage = data.message;
                    }
                })
        }
    }

    cancelBtn() {
        this.router.navigate(["dashboard/roleList"]);
    }
}
