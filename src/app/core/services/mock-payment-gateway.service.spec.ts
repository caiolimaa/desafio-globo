import { firstValueFrom } from 'rxjs';
import { MockPaymentGatewayService } from './mock-payment-gateway.service';

describe('MockPaymentGatewayService', () => {
  it('approves valid payments', async () => {
    const service = new MockPaymentGatewayService();
    const receipt = await firstValueFrom(
      service.process({ method: 'credit-card', amount: 24.9, cardLastFour: '1111' }),
    );
    expect(receipt.method).toBe('credit-card');
    expect(receipt.amount).toBe(24.9);
  });

  it('declines the documented demo card', async () => {
    const service = new MockPaymentGatewayService();
    try {
      await firstValueFrom(
        service.process({ method: 'debit-card', amount: 24.9, cardLastFour: '0000' }),
      );
      fail('Expected the payment to fail');
    } catch (error) {
      expect(error).toEqual(jasmine.objectContaining({ code: 'DECLINED' }));
    }
  });
});
