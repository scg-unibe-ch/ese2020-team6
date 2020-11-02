import { ThemeService } from './../../../../../../services/theme/theme.service';
import { Themable } from './../../../../../../models/theme/themable';
import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-select-categories',
  templateUrl: './select-categories.component.html',
  styleUrls: ['./select-categories.component.scss']
})
export class SelectCategoriesComponent extends Themable {
  @Input()
  name: string = '';
  @Input()
  cats: Array<String>;

  constructor(themeService: ThemeService) {
    super(themeService);
  }



}
