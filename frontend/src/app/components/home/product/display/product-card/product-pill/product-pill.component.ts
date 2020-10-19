import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-pill',
  templateUrl: './product-pill.component.html',
  styleUrls: ['./product-pill.component.scss']
})
export class ProductPillComponent {

  @Input()
  pillValue: string;

  @Input()
  indicatorPillColorClassFn?: () => string;

  @Input()
  title: string;

  @Input()
  size: number;

  get hasTitle(): boolean {
    return this.title ? true : false;
  }

  get indicatorPillColorClass(): string {
    if (this.indicatorPillColorClassFn) return this.indicatorPillColorClassFn();
    else return '';
  }

  get defaultPillColorClass(): string {
    return this.pillValue ? 'faded' : 'fainted default';
  }

}
