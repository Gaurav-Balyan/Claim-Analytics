import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NGXLogger } from 'ngx-logger';

import { AuthService } from 'src/app/services/auth.service';
import { ModalPopupComponent } from 'src/app/shared/modal.popup';
import { IDLE_PERIOD, TIMEOUT_PERIOD, PING_PERIOD } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  dialogRef: MatDialogRef<ModalPopupComponent>;

  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private dialog: MatDialog,
    private authService: AuthService,
    private logger: NGXLogger
  ) {
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => (this.idleState = 'No longer idle.'));

    this.idle.onTimeout.subscribe(() => {
      this.logoutSession();
    });

    this.idle.onIdleStart.subscribe(
      () => (this.idleState = 'You have gone idle!')
    );

    this.idle.onTimeoutWarning.subscribe(countdown => {
      if (!this.dialogRef) {
        this.dialogRef = this.dialog.open(ModalPopupComponent, {
          data: {
            message: 'Do you want to continue session?',
            btnOk: 'Yes',
            btnCancel: 'No'
          }
        });
        this.dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.resetSession();
          } else {
            this.logoutSession();
          }
        });
      }
    });

    // sets the ping interval to specified seconds
    keepalive.interval(PING_PERIOD);

    // Refreshing the token after the specified interval
    keepalive.onPing.subscribe(() => {
      const refreshToken = localStorage.getItem('REFRESH_TOKEN');

      // Token String for Refresh token OWIN Authentication
      const tokenDataString = `refresh_token=${refreshToken}&grant_type=refresh_token`;

      this.authService.getRefreshToken(tokenDataString).subscribe((res: any) => { 
        localStorage.setItem('ACCESS_TOKEN', res.access_token);
        localStorage.setItem('REFRESH_TOKEN', res.refresh_token);
      }, (err) => { 
        this.logger.debug(err);
      });
    });
  }

  initiateSession() {
    // Sets the period of inactivity to 10 minutes
    this.idle.setIdle(IDLE_PERIOD);
    // After 15 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(TIMEOUT_PERIOD);
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  markSessionActive() {
    this.idle.interrupt();
  }

  resetSession() {
    this.dialogRef && this.dialogRef.close();
    this.dialogRef = undefined;
    this.timedOut = false;
  }

  logoutSession() {
    this.dialogRef && this.dialogRef.close();
    this.dialogRef = undefined;
    this.idle.stop();
    this.idleState = 'Timed out!';
    this.timedOut = true;
    this.authService.logoutUser();
  }
}
