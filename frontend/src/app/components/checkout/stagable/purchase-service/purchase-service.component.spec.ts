import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseServiceComponent } from './purchase-service.component';

describe('PurchaseServiceComponent', () => {
  let component: PurchaseServiceComponent;
  let fixture: ComponentFixture<PurchaseServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
