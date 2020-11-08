import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[radioLabel]'
})
export class RadioLabelDirective {

  private _optionId: number;

  @Input()
  set radioLabel(optionId: number) {
    this._optionId = optionId;
  }

  constructor(
    private _template: TemplateRef<any>
  ) { }

  get optionId(): number {
    return this._optionId;
  }

  get template(): TemplateRef<any> {
    return this._template;
  }

}
