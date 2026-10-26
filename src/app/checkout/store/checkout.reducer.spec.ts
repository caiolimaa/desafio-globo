import {
  orderValidated,
  paymentFailed,
  paymentMethodSelected,
  paymentSubmitted,
  paymentSucceeded,
} from './checkout.actions';
import { checkoutReducer, initialCheckoutState } from './checkout.reducer';

describe('checkoutReducer', () => {
  it('selects a payment method', () => {
    const state = checkoutReducer(initialCheckoutState, paymentMethodSelected({ method: 'pix' }));
    expect(state.selectedMethod).toBe('pix');
    expect(state.status).toBe('idle');
  });

  it('moves through processing and success', () => {
    const processing = checkoutReducer(
      initialCheckoutState,
      paymentSubmitted({ request: { method: 'pix', amount: 24.9 } }),
    );
    expect(processing.status).toBe('processing');
    const receipt = {
      id: 'NEXO-TEST',
      product: processing.product,
      method: 'pix' as const,
      amount: 24.9,
      createdAt: new Date().toISOString(),
    };
    const success = checkoutReducer(processing, paymentSucceeded({ receipt }));
    expect(success.status).toBe('success');
    expect(success.receipt?.id).toBe('NEXO-TEST');
  });

  it('tracks validation and order lifecycle', () => {
    const processing = checkoutReducer(
      initialCheckoutState,
      paymentSubmitted({ request: { method: 'pix', amount: 79.9 } }),
    );
    expect(processing.validationStatus).toBe('validating');

    const validated = checkoutReducer(
      processing,
      orderValidated({
        order: {
          id: 'ABCD-123A4',
          productId: processing.product.id,
          amount: processing.product.price,
          method: 'pix',
          status: 'pending',
        },
      }),
    );
    expect(validated.validationStatus).toBe('valid');
    expect(validated.order?.status).toBe('pending');
  });

  it('stores a payment error and clears the receipt', () => {
    const state = checkoutReducer(
      initialCheckoutState,
      paymentFailed({ error: { code: 'DECLINED', message: 'Declined' } }),
    );
    expect(state.status).toBe('error');
    expect(state.error?.code).toBe('DECLINED');
    expect(state.receipt).toBeNull();
  });
});
