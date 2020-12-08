import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements AfterViewInit {

  private isActivated = false;
  private isLanded = true;

  private nativeTip: HTMLElement;
  private tipDim: DOMRect;
  private nativeTipParent: HTMLElement;
  private parentDim: DOMRect;
  @ViewChild('tipElement')
  set tipElement(tipElement: ElementRef) {
    this.nativeTip = tipElement.nativeElement;
    this.tipDim = this.nativeTip.getBoundingClientRect();
    this.nativeTipParent = this.nativeTip.parentElement;
    this.parentDim = this.nativeTipParent.getBoundingClientRect();
    console.log(this.nativeTip.getBoundingClientRect())
  }

  private static padding: number = 5;

  @Input()
  public tip: string;

  @Input()
  public position: string = 'top';

  constructor() {}

  public ngAfterViewInit(): void {
    this.offset();
  }

  private offset() {
    this.setOffset()
    this.setCenter()
  }

  private setOffset(): void {
    let pixels: number;
    if (this.position === 'left' || this.position === 'right') {
      pixels = -this.tipDim.width;
    } else {
      pixels = -this.tipDim.height;
    }
    pixels -= TooltipComponent.padding;
    this.set(pixels);
  }

  private setCenter(): void {
    let position: string;
    let pixels: number;
    if (this.position === 'left' || this.position === 'right') {
      position = 'top';
      pixels = this.pOffsetVer();
    } else {
      position = 'left';
      pixels = this.pOffsetHor();
    }

    this.set(pixels, position);
  }

  private set(pixels: number, position?: string): void {
    if (!position) position = this.position;
    this.nativeTip.style[position] = TooltipComponent.toPx(pixels);
  }

  private pOffsetHor(): number {
    return (this.parentDim.width-this.tipDim.width) / 2;
  }
  private pOffsetVer(): number {
    return (this.parentDim.height-this.tipDim.height) / 2;
  }

  private static toPx(dimension: number): string {
    return dimension + 'px';
  }

  get activated(): Array<string> {
    return [this.isActivated ? 'activated' : 'deactivated', this.isLanded ? 'landed' : 'not-landed'];
  }

  public activate(): void {
    this.isLanded = false;
    this.isActivated = true;
  }

  public deactivate(): void {
    this.isActivated = false;
  }

}
