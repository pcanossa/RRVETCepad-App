import { TestBed } from '@angular/core/testing';

import { CommonAppService } from './common-app.service';

describe('CommonAppService', () => {
  let service: CommonAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
