import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderViewListComponent } from './order-view-list.component';

describe('OrderViewListComponent', () => {
  let component: OrderViewListComponent;
  let fixture: ComponentFixture<OrderViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
