import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRejectedComponent } from './popup-rejected.component';

describe('PopupRejectedComponent', () => {
  let component: PopupRejectedComponent;
  let fixture: ComponentFixture<PopupRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
