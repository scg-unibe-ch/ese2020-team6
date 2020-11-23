import { TestBed } from '@angular/core/testing';

import { PutOrderService } from './put-order.service';

describe('PutOrderService', () => {
  let service: PutOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PutOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
