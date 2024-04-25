import { TestBed } from '@angular/core/testing';

import { AuthGuardADMService } from './auth-guard-adm.service';

describe('AuthGuardADMService', () => {
  let service: AuthGuardADMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardADMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
