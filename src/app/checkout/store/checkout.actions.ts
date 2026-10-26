import { createAction, props } from '@ngrx/store';
import {
  CheckoutOrder,
  PaymentError,
  PaymentMethod,
  PaymentReceipt,
  PaymentRequest,
} from '../../core/models/payment.model';

export const paymentMethodSelected = createAction(
  '[Payment Page] Method Selected',
  props<{ method: PaymentMethod }>(),
);

export const paymentSubmitted = createAction(
  '[Payment Page] Payment Submitted',
  props<{ request: PaymentRequest }>(),
);

export const orderValidated = createAction(
  '[Order Validation API] Order Validated',
  props<{ order: CheckoutOrder }>(),
);

export const orderValidationFailed = createAction(
  '[Order Validation API] Order Validation Failed',
  props<{ error: PaymentError }>(),
);

export const paymentSucceeded = createAction(
  '[Payment API] Payment Succeeded',
  props<{ receipt: PaymentReceipt }>(),
);

export const paymentFailed = createAction(
  '[Payment API] Payment Failed',
  props<{ error: PaymentError }>(),
);

export const paymentRetryRequested = createAction('[Error Page] Retry Requested');
export const paymentMethodChangeRequested = createAction('[Error Page] Change Method Requested');
export const checkoutReset = createAction('[Checkout] Reset');
