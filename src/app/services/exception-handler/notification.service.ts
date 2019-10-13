import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';

import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone,
    private dialog: MatDialog
  ) {}

  showSuccess(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message);
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
      this.openDialog(message);
    });
  }

  openDialog(message: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: { message }
    });
  }
}
