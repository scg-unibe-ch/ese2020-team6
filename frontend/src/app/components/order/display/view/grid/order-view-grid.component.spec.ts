import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderViewGridComponent } from './order-view-grid.component';

describe('OrderViewGridComponent', () => {
  let component: OrderViewGridComponent;
  let fixture: ComponentFixture<OrderViewGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderViewGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderViewGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
