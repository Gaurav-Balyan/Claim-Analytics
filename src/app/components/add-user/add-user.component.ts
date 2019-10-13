import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalPopupComponent } from 'src/app/shared/modal.popup';
import { PreviewUserComponent } from 'src/app/shared/components/preview-user/preview-user.component';
import { PreviewRoleComponent } from 'src/app/shared/components/preview-role/preview-role.component';
import * as _ from 'lodash';

import { userRoleList } from 'src/app/models/userRoleList';
import { NavService } from 'src/app/services/nav.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityService } from 'src/app/services/security.service';
import {
  JPASETTINGS,
  ACCOUNTSETTINGS,
  ACCOUNTACCESSSETTINGS
} from 'src/app/shared/multi-select.settings';
import { JPA, ACCOUNT } from 'src/app/shared/constants';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  pageTitle: string;
  userForm: FormGroup;
  userRolelist: userRoleList;
  userRole: any;
  userJPA: any;
  userAccountJPA: any;
  isEdit: boolean;
  editedUser: any;
  isJPAIn = false;
  isAccountIn = false;
  isJPASettings = {};
  isAccountSettings = {};
  isAccountAccessSettings = {};
  selectedAccountAccessItem: any;
  selectedJPAs: string[] = [];
  selectedAccounts: string[] = [];
  alreadyselectedJPAs = [];
  JPAsPayload: string;
  accountsPayload: string;
  statusMessage: any;
  viewRoleDefinition: any;
  formSubmitted = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private navService: NavService,
    private securityService: SecurityService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isEditMode();
    this.getRole();
    this.getAccounts();
    this.getJPA();
    this.isJPASettings = JPASETTINGS;
    this.isAccountSettings = ACCOUNTSETTINGS;
    this.isAccountAccessSettings = ACCOUNTACCESSSETTINGS;
  }

  private isEditMode() {
    this.activatedRoute.params.subscribe(params => {
      if (!!params.userId) {
        this.pageTitle = 'Edit User';
        this.createUserForm();
        this.form_control.userEmail.disable();

        // Decrypt the parameters from the URL after converting the value using atob(ASCII to Binary)
        const decryptedClaimId = this.securityService.decrypt(atob(params.userId));
        this.getUserById(decryptedClaimId);
      } else {
        this.pageTitle = 'Add User';
        this.createUserForm();
        this.form_control.userEmail.enable();

        // Setting the default radio button to AccountAccess in case of insert mode
        this.form_control.accessLevel.setValue('ACC');
        this.selectAccount(ACCOUNT);
      }
    });
  }

  private createUserForm() {
    this.userForm = this.fb.group({
      userId: [],
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userAdd1: [],
      userAdd2: [],
      userState: [],
      userCity: [],
      userZip: [],
      roleId: ['', Validators.required],
      accessLevel: '',
      jpaAccess: [],
      accountAccess: [],
      accounts: [],
      defaultCompId: '',
      statusActive: 1,// [],
      clientName: sessionStorage.getItem('SUBDOMAIN'),
      loggedInUser: this.authService.getUserData('userId')
    });
  }

  // convenience getter for easy access to form fields
  get form_control() {
    return this.userForm.controls;
  }

  onJPAItemSelect(item: any) {
    if (!_.includes(this.selectedJPAs, item.jpaId)) {
      this.selectedJPAs.push(item.jpaId);
      this.JPAsPayload = this.selectedJPAs.join(',');
    }
  }

  OnJPAItemDeSelect(item: any) {
    if (_.includes(this.selectedJPAs, item.jpaId)) {
      _.remove(this.selectedJPAs, jpaId => {
        return jpaId === item.jpaId;
      });
      this.JPAsPayload = this.selectedJPAs.join(',');
    }
  }

  onJPASelectAll(items: any) {
    this.selectedJPAs = [];
    _.forEach(items, item => {
      this.selectedJPAs.push(item.jpaId);
    });
    this.JPAsPayload = this.selectedJPAs.join(',');
  }

  onJPADeSelectAll(items: any) {
    this.selectedJPAs = [];
    this.JPAsPayload = this.selectedJPAs.join(',');
  }

  onAccountAccessItemSelect(item: any) {
    if (!_.includes(this.selectedAccounts, item.accId)) {
      this.selectedAccounts.push(item.accId);
      this.accountsPayload = this.selectedAccounts.join(',');
    }
  }

  OnAccountAccessItemDeSelect(item: any) {
    if (_.includes(this.selectedAccounts, item.accId)) {
      _.remove(this.selectedAccounts, accId => {
        return accId === item.accId;
      });
      this.accountsPayload = this.selectedAccounts.join(',');
    }
  }

  onAccountAccessSelectAll(items: any) {
    this.selectedAccounts = [];
    _.forEach(items, item => {
      this.selectedAccounts.push(item.accId);
    });
    this.accountsPayload = this.selectedAccounts.join(',');
  }

  onAccountAccessDeSelectAll(items: any) {
    this.selectedAccounts = [];
    this.accountsPayload = this.selectedAccounts.join(',');
  }

  getRole() {
    const userData = {
      clientName: sessionStorage.getItem('SUBDOMAIN'),
      userId: this.authService.getUserData('userId')
    };
    this.userService.fetchRole(userData).subscribe(res => {
      this.userRole = res.GetRoleList;
    });
  }

  getRoleById(id, event) {
    const roleId = id || event.target.value;
    const userData = {
      clientName: sessionStorage.getItem('SUBDOMAIN'),
      prodId: this.navService.getProductId(),
      roleId
    }
    this.userService.fetchRoleById(userData)
      .subscribe((res: any) => {
        this.userRolelist = res.roleResponse;
        this.viewRoleDefinition = res;
      });
  }

  getJPA() {
    const clientName = sessionStorage.getItem('SUBDOMAIN');
    const userData = { clientName };
    this.userService.fetchJPA(userData).subscribe(res => {
      this.userJPA = res.jpasResponse;
    });
  }

  getAccounts() {
    const clientName = sessionStorage.getItem('SUBDOMAIN');
    const userData = {
      clientName,
      jpaId: null
    };
    this.userService.fetchGetAccountsForJPAs(userData).subscribe(res => {
      this.userAccountJPA = res.accountsForjpasResponse;
    });
  }

  getUserById(userId) {
    const productId = this.navService.getProductId();
    const userData = {
      clientName: sessionStorage.getItem('SUBDOMAIN'),
      userId,
      productId
    };
    this.userService.fetchUserById(userData).subscribe((item: any) => {
      if (item.OK) {
        this.userForm.patchValue({
          userId: item.userId,
          userFirstName: item.userFName,
          userLastName: item.userLName,
          userEmail: item.userEmail,
          userAdd1: item.userAdd1,
          userAdd2: item.userAdd2,
          userState: item.userState,
          userCity: item.userCity,
          userZip: item.userZip,
          roleId: item.roleId,
          accessLevel: item.accessLevel,
          jpaId: item.jpaId,
          jpaAccess: item.jpaAccess,
          accountAccess: item.accountAccess,
          accounts: item.accounts,
          defaultCompId: item.defaultCompId,
          statusActive: "1",
        });

        // Setting the custom property in case of user dont access this field
        if (item.jpaAccess) {
          this.selectedJPAs = [];
          _.forEach(item.jpaAccess, item => {
            this.selectedJPAs.push(item.jpaId);
          });
          this.JPAsPayload = this.selectedJPAs.join(',');
        }

        // Setting the custom property in case of user dont access this field
        if (item.accountAccess) {
          this.selectedAccounts = [];
          _.forEach(item.accountAccess, item => {
            this.selectedAccounts.push(item.accId);
          });
          this.accountsPayload = this.selectedAccounts.join(',');
        }

        // Load the dropdown corresponding to access level selection
        this.selectAccount(item.accessLevel);

        // Fetch the roles based on roleId in case of edit mode
        this.getRoleById(item.roleId, null);
      } else { this.statusMessage = item.message }

    });
  }

  selectAccount(type) {
    switch (type) {
      case JPA:
        this.selectedAccounts = [];
        this.form_control.jpaAccess.setValidators([Validators.required]);
        this.form_control.accountAccess.clearValidators();
        this.form_control.jpaAccess.updateValueAndValidity();
        this.form_control.accountAccess.updateValueAndValidity();
        this.isJPAIn = true;
        this.isAccountIn = false;
        break;
      case ACCOUNT:
        this.selectedJPAs = [];
        this.form_control.accountAccess.setValidators([Validators.required]);
        this.form_control.jpaAccess.clearValidators();
        this.form_control.accountAccess.updateValueAndValidity();
        this.form_control.jpaAccess.updateValueAndValidity();
        this.isJPAIn = false;
        this.isAccountIn = true;
        break;
      default:
        this.selectedJPAs = [];
        this.selectedAccounts = [];
        this.form_control.jpaAccess.clearValidators();
        this.form_control.accountAccess.clearValidators();
        this.form_control.jpaAccess.updateValueAndValidity();
        this.form_control.accountAccess.updateValueAndValidity();
        this.isJPAIn = false;
        this.isAccountIn = false;
        break;
    }
  }

  previewRole() {
    // Open the preview for Role
    const previewUser = this.dialog.open(PreviewRoleComponent, {
      data: {
        message: 'Preview Role Definition',
        viewRoles: this.viewRoleDefinition
      }
    });
    previewUser.afterClosed().subscribe(result => {
      //this.viewRoleDefinition=null;
    });
  }

  UpsertUser() {
    if (this.userForm.valid) {
      let saveMessage: any;
      this.userForm.value.userEmail = this.userForm.getRawValue().userEmail;
      this.userForm.value.clientUrl = window.location.origin;

      // Payload will vary according to the accounts radio selection
      this.userForm.value.accounts = this.isJPAIn
        ? this.JPAsPayload
        : this.accountsPayload;

      // Fetch the form values to a variable to be sent as payload
      const userData = { ...this.userForm.value };

      // Open the preview
      const previewUser = this.dialog.open(PreviewUserComponent, {
        data: {
          message: 'Preview User',
          form: userData,
          roles: this.userRolelist
        }
      }
      );

      previewUser.afterClosed().subscribe(previewAccepted => {
        if (previewAccepted) {
          this.userService.addUser(userData).subscribe(res => {
            if (res.OK) {
              saveMessage = this.dialog.open(ModalPopupComponent, {
                data: {
                  message: 'Data has been saved successfully',
                  btnOk: 'OK'
                }
              });
              saveMessage.afterClosed().subscribe(result => {
                this.router.navigate(['dashboard/userList']);
              });
            } else {
              saveMessage = this.dialog.open(ModalPopupComponent, {
                data: {
                  message: res.message,
                  btnOk: 'OK'
                }
              });
            }
          });
        }
      });
    } else {
      this.formSubmitted = true;
      return false;
    }
  }

  cancelBtn() {
    this.router.navigate(['dashboard/userList']);
  }
}
