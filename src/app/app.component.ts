import { interval, take } from 'rxjs';
import { Component, OnInit, ElementRef } from '@angular/core';

import {
  MessageList,
  Messages,
  ReadObjectMessage,
  Type,
  CalculateType,
} from './shared/interfaces/notification.interface';
import { Animations } from './shared/animations/header.animation';
import { NotificationService } from './shared/services/notification.service';
declare var TradingView: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Animations.ToggleModalAnimation],
})
export class AppComponent implements OnInit {
  mostType: string = 'NaN';
  statusModal: boolean = false;
  calculateType!: CalculateType;
  statusMessageBox: boolean = false;
  messageList: MessageList = {
    dara: [
      {
        icon: 'assets/icons/figma/warning-msg.svg',
        subTitle: 'رمز عبور شما طی یک هفته منقضی خواهد شد.',
        time: '14:26:00',
        title: 'هشدار ',
        type: Type.WARNING,
        saw: false,
      },
      // {
      //   icon: 'assets/icons/figma/important-error-msg.svg',
      //   subTitle: 'ارتباط با سیستم برقرار نیست.',
      //   time: '14:26:00',
      //   title: 'خطای بحرانی',
      //   type: Type.IMPORTANT_ERROR,
      //   saw: true,
      // },
      {
        icon: 'assets/icons/figma/important-error-msg.svg',
        subTitle: 'درخواست شما با خطا مواجه شد.',
        time: '12:26:00',
        title: 'خطا',
        type: Type.ERROR,
        saw: false,
      },

      {
        icon: 'assets/icons/figma/success-msg.svg',
        subTitle: 'درخواست شما با موفقیت ثبت شد.',
        time: '18:26:00',
        title: 'درخواست موفق',
        type: Type.SUCCESS,
        saw: false,
      },
      {
        icon: 'assets/icons/figma/info-msg.svg',
        subTitle: 'گشایش حق تقدم در نماد معاملاتی',
        time: '14:26:00',
        title: 'اطلاعیه ',
        type: Type.INFORMATION,
        saw: false,
      },
    ],
    Obs: [
      {
        icon: 'assets/icons/figma/warning-msg.svg',
        subTitle: 'رمز عبور شما طی یک هفته منقضی خواهد شد.',
        time: '14:26:00',
        title: '2هشدار ',
        type: Type.WARNING,
        saw: false,
      },
      // {
      //   icon: 'assets/icons/figma/important-error-msg.svg',
      //   subTitle: 'ارتباط با سیستم برقرار نیست.',
      //   time: '14:26:00',
      //   title: '2خطای بحرانی',
      //   type: Type.IMPORTANT_ERROR,
      //   saw: false,
      // },
      {
        icon: 'assets/icons/figma/important-error-msg.svg',
        subTitle: 'درخواست شما با خطا مواجه شد.',
        time: '12:26:00',
        title: '2خطا',
        type: Type.ERROR,
        saw: false,
      },
      {
        icon: 'assets/icons/figma/success-msg.svg',
        subTitle: 'درخواست شما با موفقیت ثبت شد.',
        time: '18:26:00',
        title: 'درخواست موفق',
        type: Type.SUCCESS,
        saw: false,
      },
      {
        icon: 'assets/icons/figma/info-msg.svg',
        subTitle: 'گشایش حق تقدم در نماد معاملاتی',
        time: '14:26:00',
        title: '2اطلاعیه ',
        type: Type.INFORMATION,
        saw: false,
      },
    ],
    most: 0,
  };

  interval$ = interval(5000);
  constructor(
    private notificationService: NotificationService,
    private elem: ElementRef
  ) {}

  ngOnInit() {
    const widget = new TradingView.widget({
      symbol: 'AAPL',
      interval: 'D',
      fullscreen: true,
      container_id: 'tv_chart_container',
      // Add more configuration options here
    });
    //Sort message list object
    this.messageList.Obs = this.sortMessage(this.messageList.Obs);
    this.messageList.dara = this.sortMessage(this.messageList.dara);
    //Use push notification service for show notification
    // this.randomPushNotificationRandom('Obs');
    // this.randomPushNotificationRandom('dara');
    //Find most type notification if saw === false
    this.findMost();
  }
  //Sort message method
  sortMessage(data: Messages[]) {
    const messages: Messages[] = data.sort(
      (a: Messages, b: Messages) => a.type - b.type
    );
    return messages.sort(
      (a: Messages, b: Messages) => Number(a.saw) - Number(b.saw)
    );
  }
  //Clear messagelist object
  removeMessage() {
    this.messageList.Obs = [];
    this.messageList.dara = [];
  }
  //Change status modal (show/hide)
  modalStatus(defaultValue: boolean) {
    defaultValue === false
      ? (this.statusModal = defaultValue)
      : (this.statusModal = !this.statusModal);
  }
  //Push notification method (you most can call service but this if you need to create static data, you must call the whole method)
  randomPushNotificationRandom(objectName: 'dara' | 'Obs') {
    //Set interval for 5 push notification call
    this.interval$.pipe(take(5)).subscribe(() => {
      //Get random message object from message list Dara trader or Observe
      const newIndexMessage: number = Math.floor(
        Math.random() * this.messageList[objectName].length
      );

      //Call notificationService method for show notification
      this.notificationService.showNotification(
        this.messageList[objectName].length > 0
          ? this.messageList[objectName][newIndexMessage].type
          : Type.IMPORTANT_ERROR,
        this.messageList[objectName].length > 0
          ? this.messageList[objectName][newIndexMessage].title
          : 'Empty',
        this.messageList[objectName].length > 0
          ? this.messageList[objectName][newIndexMessage].subTitle
          : 'Empty Message',
        'assets/icons/figma/arrow.svg'
      );
      //Push on message list for show in modal notification
      this.messageList[objectName].push({
        subTitle:
          this.messageList[objectName].length > 0
            ? this.messageList[objectName][newIndexMessage].subTitle
            : 'Empty Message',
        icon:
          this.messageList[objectName].length > 0
            ? this.messageList[objectName][newIndexMessage].icon
            : 'assets/icons/figma/important-error-msg.svg',
        saw: false,
        time:
          this.messageList[objectName].length > 0
            ? this.messageList[objectName][newIndexMessage].time
            : '00:00:00',
        title:
          this.messageList[objectName].length > 0
            ? this.messageList[objectName][newIndexMessage].title
            : 'Empty',
        type:
          this.messageList[objectName].length > 0
            ? this.messageList[objectName][newIndexMessage].type
            : Type.IMPORTANT_ERROR,
      });
      //Sort message list
      this.messageList[objectName] = this.sortMessage(
        this.messageList[objectName]
      );
      //Find most type we have
      this.findMost();
    });
  }

  pushNotificationRandom(objectName: 'dara' | 'Obs') {
    //Get random message object from message list Dara trader or Observe
    const newIndexMessage: number = Math.floor(
      Math.random() * this.messageList[objectName].length
    );
    //Call notificationService method for show notification
    this.notificationService.showNotification(
      Type.WARNING,
      'هشدار ',
      'رمز عبور شما طی یک هفته منقضی خواهد شد.',
      'assets/icons/figma/arrow.svg'
    );
    //Push on message list for show in modal notification
    this.messageList[objectName].push({
      subTitle:
        this.messageList[objectName].length > 0
          ? this.messageList[objectName][newIndexMessage].subTitle
          : 'Empty Message',
      icon:
        this.messageList[objectName].length > 0
          ? this.messageList[objectName][newIndexMessage].icon
          : 'assets/icons/figma/important-error-msg.svg',
      saw: false,
      time:
        this.messageList[objectName].length > 0
          ? this.messageList[objectName][newIndexMessage].time
          : '00:00:00',
      title:
        this.messageList[objectName].length > 0
          ? this.messageList[objectName][newIndexMessage].title
          : 'Empty',
      type:
        this.messageList[objectName].length > 0
          ? this.messageList[objectName][newIndexMessage].type
          : Type.WARNING,
    });
    //Sort message list
    this.messageList[objectName] = this.sortMessage(
      this.messageList[objectName]
    );
    //Find most type we have
    this.findMost();
  }
  //Find most type we have
  findMost() {
    let calculateType: CalculateType = {
      important: 0,
      error: 0,
      warning: 0,
      success: 0,
      information: 0,
    };
    //Reset data calculateType
    this.calculateType = calculateType;
    //Find type count in Observe message list
    this.messageList.Obs.forEach((message: Messages) => {
      this.findMostSwitchCase(message);
    });
    //Find type count in Dara trader message list
    this.messageList.dara.forEach((message: Messages) => {
      this.findMostSwitchCase(message);
    });
    //Set the highest key type to mostType
    this.mostType = this.getKeysWithHighestValue(this.calculateType, 5);
  }
  //Find highest key type method
  getKeysWithHighestValue(o: any, n: any) {
    var keys = Object.keys(o);
    keys.sort(function (a, b) {
      return o[b] - o[a];
    });
    let mostkey = keys.slice(0, n);
    return mostkey[0];
  }
  //Counter type method
  findMostSwitchCase(message: Messages) {
    switch (message.type) {
      case 0:
        this.calculateType.important++;
        break;
      case 1:
        this.calculateType.error++;
        break;
      case 2:
        this.calculateType.warning++;
        break;
      case 3:
        this.calculateType.success++;
        break;
      case 4:
        this.calculateType.information++;
        break;
    }
  }
  //Check status saw in message object
  readMessage(data: ReadObjectMessage) {
    data.isDara
      ? (this.messageList.dara[data.index].saw = true)
      : (this.messageList.Obs[data.index].saw = true);
    this.messageList.Obs = this.sortMessage(this.messageList.Obs);
    this.messageList.dara = this.sortMessage(this.messageList.dara);
  }
}
