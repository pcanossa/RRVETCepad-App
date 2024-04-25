import { TestBed } from '@angular/core/testing';

import { InstaService } from './insta.service';

describe('InstaService', () => {
  let service: InstaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
