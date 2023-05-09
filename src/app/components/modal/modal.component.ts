import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';

import {
  MessageList,
  ReadObjectMessage,
} from 'src/app/shared/interfaces/notification.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  event!:Event;
  @Input() statusMessageBox?: boolean;
  @Input() messageList?: MessageList;

  @Output() onReadMessage = new EventEmitter<ReadObjectMessage>();
  @Output() onRemoveMessage = new EventEmitter<Event>();

  @ViewChild('daraMessage', { static: true }) daraMessage!: ElementRef;

  //Remove message emitter
  removeMessage() {
    this.onRemoveMessage.emit();
  }

  //Read message emmiter
  readMessage(index: number) {
    this.onReadMessage.emit({
      index: index,
      isDara: this.daraMessage.nativeElement.classList.contains('active'),
    });
  }

  //Get message list selected from check active class and show in modal
  get getMessage() {
    if (this.daraMessage.nativeElement.classList.contains('active')) {
      return this.messageList?.dara;
    } else {
      return this.messageList?.Obs;
    }
  }

}
