import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCardGridComponent } from './order-card-grid.component';

describe('OrderCardGridComponent', () => {
  let component: OrderCardGridComponent;
  let fixture: ComponentFixture<OrderCardGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCardGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
