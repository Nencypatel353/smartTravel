import { CanActivateFn } from '@angular/router';

export const authtravelGuard: CanActivateFn = (route, state) => {
  return true;
};
