import { TestBed } from '@angular/core/testing';

import { NgfeNgAdapterService } from './ngfe-ng-adapter.service';

describe('NgfeNgAdapterService', () => {
  let service: NgfeNgAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgfeNgAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
