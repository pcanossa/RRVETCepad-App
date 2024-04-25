import { TestBed } from '@angular/core/testing';

import { AnimaisAppService } from './animais-app.service';

describe('AnimaisAppService', () => {
  let service: AnimaisAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimaisAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
