import { Component, OnInit , Input, Output, EventEmitter, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ProfileNavigationElementModel } from '../../../../../models/user/profile/navigation-element/profile-navigation-element.model';
import { PopupDirective } from '../popup/popup.directive';
import { PopupComponent } from '../../../../../models/user/profile/navigation/popup/popup.interface';

@Component({
  selector: 'app-navigation-element',
  templateUrl: './navigation-element.component.html',
  styleUrls: ['./navigation-element.component.scss']
})
export class NavigationElementComponent implements OnInit {

  @Input()
  navigationElement: ProfileNavigationElementModel;

  @Output()
  navigationClickEvent = new EventEmitter<ProfileNavigationElementModel>();

  @ViewChild(PopupDirective, {static: true})
  popup: PopupDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  public ngOnInit(): void {
    if (this.existsPopup()) {
      const popupComponent = this.navigationElement.popupComponent;
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(popupComponent);
      const viewContainerRef = this.popup.viewContainerRef;

      viewContainerRef.clear();
      viewContainerRef.createComponent<PopupComponent>(componentFactory);
    }
  }

  private existsPopup(): boolean {
    return this.navigationElement.popupComponent != null;
  }

  public onNavigationElementClick(navigationElement: ProfileNavigationElementModel): void {
    this.navigationClickEvent.emit(navigationElement);
  }

}
