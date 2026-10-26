import { createReducer, on } from '@ngrx/store';
import { CHECKOUT_PRODUCT } from '../../core/services/mock-payment-gateway.service';
import * as CheckoutActions from './checkout.actions';
import { CheckoutState } from './checkout.state';

export const initialCheckoutState: CheckoutState = {
  product: CHECKOUT_PRODUCT,
  selectedMethod: null,
  lastRequest: null,
  order: null,
  validationStatus: 'idle',
  status: 'idle',
  receipt: null,
  error: null,
};

export const checkoutReducer = createReducer(
  initialCheckoutState,
  on(CheckoutActions.paymentMethodSelected, (state, { method }) => ({
    ...state,
    selectedMethod: method,
    order: null,
    validationStatus: 'idle',
    error: null,
  })),
  on(CheckoutActions.paymentSubmitted, (state, { request }) => ({
    ...state,
    selectedMethod: request.method,
    lastRequest: request,
    order: null,
    validationStatus: 'validating',
    status: 'processing',
    error: null,
    receipt: null,
  })),
  on(CheckoutActions.orderValidated, (state, { order }) => ({
    ...state,
    order,
    validationStatus: 'valid',
  })),
  on(CheckoutActions.orderValidationFailed, (state, { error }) => ({
    ...state,
    validationStatus: 'invalid',
    status: 'error',
    receipt: null,
    error,
  })),
  on(CheckoutActions.paymentSucceeded, (state, { receipt }) => ({
    ...state,
    order: state.order ? { ...state.order, status: 'confirmed' } : state.order,
    validationStatus: 'valid',
    status: 'success',
    receipt,
    error: null,
  })),
  on(CheckoutActions.paymentFailed, (state, { error }) => ({
    ...state,
    order: state.order ? { ...state.order, status: 'failed' } : state.order,
    status: 'error',
    receipt: null,
    error,
  })),
  on(CheckoutActions.paymentRetryRequested, (state) => ({
    ...state,
    order: null,
    validationStatus: 'idle',
    status: 'idle',
    error: null,
    receipt: null,
  })),
  on(CheckoutActions.paymentMethodChangeRequested, (state) => ({
    ...state,
    selectedMethod: null,
    lastRequest: null,
    order: null,
    validationStatus: 'idle',
    status: 'idle',
    error: null,
    receipt: null,
  })),
  on(CheckoutActions.checkoutReset, () => initialCheckoutState),
);
