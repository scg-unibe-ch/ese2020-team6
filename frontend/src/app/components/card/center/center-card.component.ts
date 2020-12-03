import { Component } from '@angular/core';
import { CardDirective } from '../card.directivce'

@Component({
  selector: 'center-card',
  templateUrl: '../card.component.html',
  styleUrls: ['./center-card.component.scss']
})
export class CenterCardComponent extends CardDirective {}
