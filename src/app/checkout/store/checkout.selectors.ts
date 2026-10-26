import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckoutState } from './checkout.state';

export const selectCheckoutState = createFeatureSelector<CheckoutState>('checkout');
export const selectProduct = createSelector(selectCheckoutState, (state) => state.product);
export const selectSelectedMethod = createSelector(
  selectCheckoutState,
  (state) => state.selectedMethod,
);
export const selectLastRequest = createSelector(selectCheckoutState, (state) => state.lastRequest);
export const selectOrder = createSelector(selectCheckoutState, (state) => state.order);
export const selectOrderValidationStatus = createSelector(
  selectCheckoutState,
  (state) => state.validationStatus,
);
export const selectPaymentStatus = createSelector(selectCheckoutState, (state) => state.status);
export const selectReceipt = createSelector(selectCheckoutState, (state) => state.receipt);
export const selectPaymentError = createSelector(selectCheckoutState, (state) => state.error);
export const selectIsProcessing = createSelector(
  selectPaymentStatus,
  (status) => status === 'processing',
);
export const selectCanViewSuccess = createSelector(
  selectPaymentStatus,
  selectReceipt,
  (status, receipt) => status === 'success' && receipt !== null,
);
export const selectCanViewError = createSelector(
  selectPaymentStatus,
  selectPaymentError,
  (status, error) => status === 'error' && error !== null,
);
