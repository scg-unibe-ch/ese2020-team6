import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewListComponent } from './product-view-list.component';

describe('ProductViewListComponent', () => {
  let component: ProductViewListComponent;
  let fixture: ComponentFixture<ProductViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
