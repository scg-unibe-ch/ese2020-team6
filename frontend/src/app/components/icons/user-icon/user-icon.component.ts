import { Component, Input } from '@angular/core';
import { Themable } from '../../../models/theme/themable';
import { ThemeService } from '../../../services/theme/theme.service';

@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.scss']
})
export class UserIconComponent extends Themable {

  @Input() width: string;
  @Input() height: string;

  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
  }

}
