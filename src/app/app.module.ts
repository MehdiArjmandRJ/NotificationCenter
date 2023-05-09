import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InlineSVGModule } from 'ng-inline-svg-2';

import {
  FooterComponent,
  HeaderComponent,
  NotificationComponent,
} from './shared/components';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalComponent } from './components/modal/modal.component';
import { ActiveBtnDirective } from './shared/directives/change-class.directive';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    HeaderComponent,
    FooterComponent,
    ActiveBtnDirective,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InlineSVGModule.forRoot(),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
