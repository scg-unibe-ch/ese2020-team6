import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Themable } from 'src/app/models/theme/themable';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent extends Themable implements OnInit  {

  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
   }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(form, 'Heeellllllllllooooooooooooooo');
  }

}
