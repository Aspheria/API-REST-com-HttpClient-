import { TestBed } from '@angular/core/testing';

import { PccService } from './pcc.service';

describe('CarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PccService = TestBed.get(PccService);
    expect(service).toBeTruthy();
  });
});
