import { TestBed } from '@angular/core/testing';

import { TrasnactionService } from './trasnaction.service';

describe('TrasnactionService', () => {
  let service: TrasnactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrasnactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
