import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { NotificationService } from './notification.service';
import { throwError } from 'rxjs';
import { LoggingService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const loggerService = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      // Server Error
      message = errorService.getServerMessage(error);
      stackTrace = errorService.getServerStack(error);
      // notifier.showError(message);
      // notifier.showError('Your session has expired, please logout and login again.');
    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
      notifier.showError(message);
    }

    // Always log errors
    loggerService.logError(message, stackTrace);
    console.error(message);
    return throwError(message);
  }
}
