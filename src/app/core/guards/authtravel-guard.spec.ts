import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authtravelGuard } from './authtravel-guard';

describe('authtravelGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authtravelGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
