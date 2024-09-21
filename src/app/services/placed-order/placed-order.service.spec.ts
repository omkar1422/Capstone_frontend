import { TestBed } from '@angular/core/testing';

import { PlacedOrderService } from './placed-order.service';

describe('PlacedOrderService', () => {
  let service: PlacedOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacedOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
