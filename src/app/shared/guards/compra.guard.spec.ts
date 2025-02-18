import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { compraGuard } from './compra.guard';

describe('compraGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => compraGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
