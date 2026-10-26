import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { provideStore } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { paymentErrorGuard } from './payment-error.guard';
import { paymentSuccessGuard } from './payment-success.guard';
import { checkoutReducer } from '../store/checkout.reducer';

describe('payment route guards', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideStore({ checkout: checkoutReducer })],
    });
  });

  it('redirects direct success access when no receipt exists', async () => {
    const result = await firstValueFrom(
      TestBed.runInInjectionContext(
        () =>
          paymentSuccessGuard(
            {} as ActivatedRouteSnapshot,
            {} as RouterStateSnapshot,
          ) as Observable<boolean | UrlTree>,
      ),
    );
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/payment');
  });

  it('redirects direct error access when no failure exists', async () => {
    const result = await firstValueFrom(
      TestBed.runInInjectionContext(
        () =>
          paymentErrorGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as Observable<
            boolean | UrlTree
          >,
      ),
    );
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/payment');
  });
});
