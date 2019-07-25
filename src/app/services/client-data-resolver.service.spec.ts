import { TestBed } from '@angular/core/testing';

import { ClientDataResolverService } from './client-data-resolver.service';

describe('ClientDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientDataResolverService = TestBed.get(ClientDataResolverService);
    expect(service).toBeTruthy();
  });
});
