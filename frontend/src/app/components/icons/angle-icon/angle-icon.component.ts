import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-angle-icon',
  templateUrl: './angle-icon.component.html',
  styleUrls: ['./angle-icon.component.scss']
})
export class AngleIconComponent {

    @Input() width: string;
    @Input() height: string;

}
