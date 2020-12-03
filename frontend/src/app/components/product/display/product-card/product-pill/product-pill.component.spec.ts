import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPillComponent } from './product-pill.component';

describe('ProductPillComponent', () => {
  let component: ProductPillComponent;
  let fixture: ComponentFixture<ProductPillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
