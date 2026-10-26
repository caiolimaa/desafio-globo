import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectCanViewSuccess } from '../store/checkout.selectors';

export const paymentSuccessGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  return store
    .select(selectCanViewSuccess)
    .pipe(map((canView) => (canView ? true : router.createUrlTree(['/payment']))));
};
