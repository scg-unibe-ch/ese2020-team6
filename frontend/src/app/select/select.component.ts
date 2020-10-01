import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input()
  name: String = "";

  @Input()
  options: Array<String> = new Array<String>();

  selected: String;
  optionsHidden: Boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.selected = this.name;
  }

  onShowOptions() {
    this.optionsHidden = !this.optionsHidden;
    console.log(this.optionsHidden);

  }

  onSelect(option: String) {
    this.selected = option;
    this.onShowOptions();
  }

  getPlaceholderClass() {
    return this.selected === this.name ? 'placeholder-notSelected' : '';
  }

  getSVGClass() {
    return this.optionsHidden ? 'down' : 'up';
  }

}
