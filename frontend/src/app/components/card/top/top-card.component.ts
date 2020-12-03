import { Component } from '@angular/core';
import { CardDirective } from '../card.directivce'

@Component({
  selector: 'top-card',
  templateUrl: '../card.component.html',
  styleUrls: ['./top-card.component.scss']
})
export class TopCardComponent extends CardDirective {}
