import { Component, Input, Optional, Inject, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../../value-accessor-base';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FileComponent, multi: true}
  ]
})
export class FileComponent  extends ValueAccessorBase<string> {
  public type = 'file';

  @Input()
  public showError = true;

  @Input()
  public placeholder: string;

  @Input()
  public name: string;

  @Input()
  public accept: string;

  @ViewChild(NgModel)
  model: NgModel;
}
