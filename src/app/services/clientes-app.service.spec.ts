import { TestBed } from '@angular/core/testing';

import { ClientesAppService } from './clientes-app.service';

describe('ClientesAppService', () => {
  let service: ClientesAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
