import { Component, Input } from '@angular/core';

@Component({
  selector: 'center-card',
  templateUrl: './center-card.component.html',
  styleUrls: ['./center-card.component.scss']
})
export class CenterCardComponent {
  @Input()
  title: string;
  @Input()
  errorMessage: string;
}
