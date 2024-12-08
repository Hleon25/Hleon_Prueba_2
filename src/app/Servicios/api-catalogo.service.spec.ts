import { TestBed } from '@angular/core/testing';

import { ApiCatalogoService } from './api-catalogo.service';

describe('ApiCatalogoService', () => {
  let service: ApiCatalogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCatalogoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
