import { Routes } from '@angular/router';
import { paymentErrorGuard } from './checkout/guards/payment-error.guard';
import { paymentSuccessGuard } from './checkout/guards/payment-success.guard';

export const routes: Routes = [
  {
    path: 'payment',
    loadComponent: () =>
      import('./checkout/pages/payment-page/payment-page.component').then(
        (module) => module.PaymentPageComponent,
      ),
  },
  {
    path: 'success',
    canActivate: [paymentSuccessGuard],
    loadComponent: () =>
      import('./checkout/pages/success-page/success-page.component').then(
        (module) => module.SuccessPageComponent,
      ),
  },
  {
    path: 'error',
    canActivate: [paymentErrorGuard],
    loadComponent: () =>
      import('./checkout/pages/error-page/error-page.component').then(
        (module) => module.ErrorPageComponent,
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'payment' },
  { path: '**', redirectTo: 'payment' },
];
