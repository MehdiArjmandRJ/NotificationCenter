import {
  Component,
  ElementRef,
  EventEmitter,
  Renderer2,
  Input,
  OnInit,
  Output,
  ViewChild,
  HostListener,
} from '@angular/core';
import { interval, Subscription, take } from 'rxjs';

import { MessageList } from '../../interfaces/notification.interface';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  timeNow: Date = new Date();
  interval$ = interval(1000);
  unsubscribe!: Subscription;
  haveNotification: boolean = false;
  animationState: string = '0';
  @Input() mostType!: string;
  @Input() statusModal!: boolean;
  @Input() messageList!: MessageList;

  @Output() changeModalStatus = new EventEmitter<boolean>();

  @ViewChild('notificationIcon', { static: true })
  notificationIcon!: ElementRef;
  @ViewChild('arrowIcon', { static: true })
  arrowIcon!: ElementRef;

  constructor(
    private notificationService: NotificationService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    // set rxjsInterval for timer
    this.unsubscribe = this.interval$.subscribe(() => {
      this.timeNow = new Date();
    });
    //Check sort for initial header component
    this.checkYourMessage();
    //Check sort after a push notification
    this.notificationService.NotificationData$.subscribe(() => {
      this.checkYourMessage();
    });

    //Check we have notification in app or not for arrow icon animation
    this.notificationService.haveNotification$.subscribe((data: boolean) => {
      this.haveNotification = data;
    });
  }

  //Check open and close notification modala and handle class animation icon
  modalStatus() {
    const arrowIcon = this.arrowIcon.nativeElement;
    if (this.statusModal) {
      this.renderer.removeClass(arrowIcon, 'open');
      this.renderer.addClass(arrowIcon, 'close');
    } else {
      this.renderer.removeClass(arrowIcon, 'close');
      this.renderer.addClass(arrowIcon, 'open');
    }
    this.checkYourMessage();
    this.changeModalStatus.emit(true);
  }

  //Priority sort color icon
  checkYourMessage() {
    console.log('object');
    this.renderer.removeClass(this.notificationIcon.nativeElement, 'important');
    this.renderer.removeClass(this.notificationIcon.nativeElement, 'error');
    this.renderer.removeClass(this.notificationIcon.nativeElement, 'warning');
    this.renderer.removeClass(this.notificationIcon.nativeElement, 'success');
    this.renderer.removeClass(
      this.notificationIcon.nativeElement,
      'information'
    );
    this.renderer.removeClass(this.notificationIcon.nativeElement, 'nun');

    let type: number =
      this.messageList.Obs[0]?.type < this.messageList.dara[0]?.type
        ? this.messageList.Obs[0]?.saw
          ? 5
          : this.messageList.Obs[0]?.type
        : this.messageList.Obs[0]?.saw
        ? 5
        : this.messageList.dara[0]?.type;
    switch (type) {
      case 0:
        this.renderer.addClass(
          this.notificationIcon.nativeElement,
          'important'
        );
        break;
      case 1:
        this.renderer.addClass(this.notificationIcon.nativeElement, 'error');
        break;
      case 2:
        this.renderer.addClass(this.notificationIcon.nativeElement, 'warning');
        break;
      case 3:
        this.renderer.addClass(this.notificationIcon.nativeElement, 'success');
        break;
      case 4:
        this.renderer.addClass(
          this.notificationIcon.nativeElement,
          'information'
        );
        break;
      case 5:
        this.renderer.addClass(this.notificationIcon.nativeElement, 'nun');
        break;
    }
  }

  //Most sort color icon
  checkYourMessageMost() {
    this.renderer.removeClass(this.notificationIcon.nativeElement, 'important');
    this.renderer.removeClass(this.notificationIcon.nativeElement, 'error');
    this.renderer.removeClass(this.notificationIcon.nativeElement, 'warning');
    this.renderer.removeClass(this.notificationIcon.nativeElement, 'success');
    this.renderer.removeClass(
      this.notificationIcon.nativeElement,
      'information'
    );
    this.renderer.removeClass(this.notificationIcon.nativeElement, 'nun');

    this.renderer.addClass(this.notificationIcon.nativeElement, this.mostType);
  }

  //ChangeState animation icon
  conditionStateIcon() {
    this.interval$.pipe(take(4)).subscribe(() => {
      if (Number(this.animationState) < 3) {
        this.animationState = (Number(this.animationState) + 1).toString();
      }
    });
  }

  //Check click outside of modal
  @HostListener('document:click', ['$event'])
  changeStatusModal?(event: any) {
    //Prevention of defined is not iterable
    if (event.target.nodeName !== 'HTML') {
      //Check target
      //Condition one : is it icon modal in header ?
      //Condition two : is it modal box ?
      //Condition three : it is another node.
      if (
        Array.from(event?.target?.classList!)?.includes('status-modal-icon')!
      ) {
        this.modalStatus();
      } else if (
        Array.from(event?.target?.classList)?.includes(
          'notification-StopPropagation'
        )! ||
        Array.from(event?.target?.offsetParent?.classList!)?.includes(
          'notification-box'
        )! ||
        Array.from(event?.target?.classList)?.includes('notification-box')!
      ) {
        event.stopPropagation();
      } else {
        const arrowIcon = this.arrowIcon.nativeElement;
        //Check icon have open class or not
        //if have open class remove it and add close class finally emit change status modal
        if (Array.from(arrowIcon?.classList)?.includes('open')!) {
          this.renderer.removeClass(arrowIcon, 'open');
          this.renderer.addClass(arrowIcon, 'close');
          this.changeModalStatus.emit(false);
        }
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
