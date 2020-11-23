import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCardListComponent } from './order-card-list.component';

describe('OrderCardListComponent', () => {
  let component: OrderCardListComponent;
  let fixture: ComponentFixture<OrderCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
