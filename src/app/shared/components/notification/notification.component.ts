import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { interval, take } from 'rxjs';

import { Notification } from '../../interfaces/notification.interface';
import { NotificationService } from '../../services/notification.service';
import { collapseHorizontallyAnimation } from '../../animations/notification.animation';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [collapseHorizontallyAnimation()],
})
export class NotificationComponent implements OnInit {
  interval$ = interval(300);
  disMissInterval$ = interval(5000);

  @ViewChild('notification', { static: true }) notification!: ElementRef;

  constructor(
    private notificationService: NotificationService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    //Observe notification service for push notification
    this.notificationService.NotificationData$.subscribe(
      (data: Notification) => {
        let checkHaveNotification: boolean = true;
        //Create main element for show notification
        const element: ElementRef = this.renderer.createElement('div');
        //Element creator notification box
        this.elementCreator(data, element);
      }
    );
  }

  //Condition for handle change state animation notification
  conditionElement(data: Notification, element: ElementRef) {
    this.interval$.pipe(take(4)).subscribe(() => {
      if (Number(data.stateNumber) < 3) {
        data.stateNumber = (Number(data.stateNumber) + 1).toString();
        this.renderer.setProperty(
          element,
          '@collapseHorizontally',
          data.stateNumber
        );
        //Remove divider element when state animation is 1
        if (Number(data.stateNumber) === 1) {
          this.renderer.removeChild(
            element,
            this.renderer.selectRootElement('.divider')
          );
        }
      } else {
        this.renderer.removeChild(this.notification, element);

        //Change notification state for animation arrow icon (i use settime out because animation need time for hide notification)
        setTimeout(() => {
          if (!this.notification.nativeElement.hasChildNodes()) {
            this.notificationService.haveNotification$.next(false);
          }
        }, 200);
      }
    });
  }
  //Element creator for details box notification
  elementCreator(data: Notification, element: ElementRef) {
    //create main box and set property and event
    this.renderer.addClass(element, 'toast');
    this.renderer.addClass(element, data.state);
    this.renderer.addClass(element, 'fade-in-image');
    this.renderer.setProperty(
      element,
      '@collapseHorizontally',
      data.stateNumber
    );
    this.renderer.listen(element, 'click', () => {
      this.conditionElement(data, element);
    });
    this.notification.nativeElement.appendChild(element);
    //Create icon box
    const iconBox: ElementRef = this.renderer.createElement('div');
    this.renderer.addClass(iconBox, 'icon-box');
    this.renderer.appendChild(element, iconBox);
    //Create and set icon to selector
    const icon: ElementRef = this.renderer.createElement('div');
    this.renderer.addClass(icon, 'icon');
    this.renderer.setProperty(
      icon,
      'innerHTML',
      `<svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6.28571L8 12L18 2" stroke="white" stroke-width="4" stroke-linecap="round"/>
      </svg>
      `
    );
    this.renderer.appendChild(iconBox, icon);
    //Create divider selector
    const divider: ElementRef = this.renderer.createElement('div');
    this.renderer.addClass(divider, 'divider');
    this.renderer.appendChild(iconBox, divider);
    //Create message box selector
    const messageBox: ElementRef = this.renderer.createElement('div');
    this.renderer.addClass(messageBox, 'message-box');
    this.renderer.appendChild(element, messageBox);
    //Create title selector
    const title: ElementRef = this.renderer.createElement('div');
    this.renderer.addClass(title, 'title');
    this.renderer.setProperty(title, 'innerHTML', data.title);
    this.renderer.appendChild(messageBox, title);
    //Create message selector
    const message: ElementRef = this.renderer.createElement('div');
    this.renderer.addClass(message, 'message');
    this.renderer.setProperty(message, 'innerHTML', data.subtitle);
    this.renderer.appendChild(messageBox, message);
    //Change notification state for animation arrow icon
    this.notificationService.haveNotification$.next(true);
    //Set interval (5000ms) for change state notification box animation
    this.disMissInterval$.pipe(take(1)).subscribe(() => {
      this.conditionElement(data, element);
    });
  }
}
