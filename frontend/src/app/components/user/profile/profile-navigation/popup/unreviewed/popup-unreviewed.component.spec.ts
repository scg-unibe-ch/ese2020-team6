import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUnreviewedComponent } from './popup-unreviewed.component';

describe('PopupUnreviewedComponent', () => {
  let component: PopupUnreviewedComponent;
  let fixture: ComponentFixture<PopupUnreviewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupUnreviewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUnreviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
