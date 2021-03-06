import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from 'src/app/models/theme/theme.module';
import { FormsModule } from '@angular/forms';
import { CustomFormModule } from '../custom-form/custom-form.module';

import { MessagesComponent } from './messages/messages.component';
import { ThreadsComponent } from './threads/threads.component';
import { MessengerComponent } from './messenger.component';
import { MessageComponent } from './message/message.component';
import { LoaderModule } from '../loader/loader.module';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [
    MessageComponent,
    MessagesComponent,
    ThreadsComponent,
    MessengerComponent,
  ],
  imports: [
    TooltipModule,
    LoaderModule,
    CustomFormModule,
    ThemeModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    MessageComponent,
    MessagesComponent,
    ThreadsComponent,
    MessengerComponent
  ]
})
export class MessageModule { }
