import { TestBed } from '@angular/core/testing';

import { CartbService } from './cartb.service';

describe('CartbService', () => {
  let service: CartbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
