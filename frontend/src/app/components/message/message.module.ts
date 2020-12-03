import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from 'src/app/models/theme/theme.module';
import { FormsModule } from '@angular/forms';
import { CustomFormModule } from '../custom-form/custom-form.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

import { MessageContentComponent } from './content/message-content.component';
import { MessageThreadsComponent } from './threads/message-threads.component';
import { MessagesComponent } from './messages.component';

@NgModule({
  declarations: [
    MessageContentComponent,
    MessageThreadsComponent,
    MessagesComponent
  ],
  imports: [
    CustomFormModule,
    ThemeModule,
    FormsModule,
    CommonModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 2500}
    }
  ],
  exports: [
    MessageContentComponent,
    MessageThreadsComponent,
    MessagesComponent
  ]
})
export class MessageModule { }
