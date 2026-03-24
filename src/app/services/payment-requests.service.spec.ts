import { TestBed } from '@angular/core/testing';

import { PaymentRequestsService } from './payment-requests.service';

describe('PaymentRequestsService', () => {
  let service: PaymentRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
