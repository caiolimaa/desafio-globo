import { firstValueFrom } from 'rxjs';
import { CHECKOUT_PRODUCT } from './mock-payment-gateway.service';
import { MockOrderValidationService } from './mock-order-validation.service';

describe('MockOrderValidationService', () => {
  it('validates a sanitized card order', async () => {
    const service = new MockOrderValidationService();
    const result = await firstValueFrom(
      service.validate(
        {
          method: 'credit-card',
          amount: CHECKOUT_PRODUCT.price,
          cardBrand: 'Visa',
          cardLastFour: '4242',
        },
        CHECKOUT_PRODUCT,
      ),
    );

    expect(result.valid).toBeTrue();
    expect(result.order?.id).toMatch(/^[A-Z]{4}-[A-Z0-9]{5}$/);
  });

  it('rejects an order with a mismatched amount', async () => {
    const service = new MockOrderValidationService();
    const result = await firstValueFrom(
      service.validate({ method: 'pix', amount: 1 }, CHECKOUT_PRODUCT),
    );

    expect(result.valid).toBeFalse();
    expect(result.message).toContain('dados do pedido');
  });
});
