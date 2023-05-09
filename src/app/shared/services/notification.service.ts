import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { Notification } from '../interfaces/notification.interface';
// Add this constant ⤵
export const NOTIFICATION_STATE = {
  SUCCESS: 'success',
  WARNING: 'warning',
  IMPORTANT_ERROR: 'important-error',
  INFORMATION: 'information',
  ERROR: 'error',
};

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public NotificationData$: Subject<Notification> = new Subject<Notification>();
  public haveNotification$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public resetTimer$ = new Subject();
  private timer$ = interval(5000);

  constructor() {}
  //Show notification when push notification
  showNotification(
    toastState: number = NaN,
    toastTitle: string = '',
    toastSubTitle: string = '',
    toastIcon: string = ''
  ): void {
    //Check state type and return string value from Type Enum
    let state: string;
    switch (toastState) {
      case 0:
        state = NOTIFICATION_STATE.IMPORTANT_ERROR;
        break;
      case 1:
        state = NOTIFICATION_STATE.ERROR;
        break;
      case 2:
        state = NOTIFICATION_STATE.WARNING;
        break;
      case 3:
        state = NOTIFICATION_STATE.SUCCESS;
        break;
      case 4:
        state = NOTIFICATION_STATE.INFORMATION;
        break;
    }

    // Observables use '.next()' to indicate what they want done with observable
    // This will update the notificationState to the notificationState passed into the function
    this.NotificationData$.next({
      icon: toastIcon,
      subtitle: toastSubTitle,
      title: toastTitle,
      state: state!,
      show: true,
      stateNumber: '0',
    });
  }
}
