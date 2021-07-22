import { TestBed } from '@angular/core/testing';

import { NgfeService } from './ngfe.service';

describe('NgfeService', () => {
  let service: NgfeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgfeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
