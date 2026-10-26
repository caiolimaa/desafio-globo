import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CHECKOUT_COPY } from '../../../core/content/checkout-copy';
import { PaymentMethod } from '../../../core/models/payment.model';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-payment-result-details',
  imports: [CurrencyPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment-result-details.component.html',
  styleUrls: ['./payment-result-details.component.scss'],
})
export class PaymentResultDetailsComponent {
  readonly copy = CHECKOUT_COPY;
  readonly product = input.required<Product>();
  readonly orderId = input<string | undefined>();
  readonly method = input.required<PaymentMethod>();
  readonly amount = input.required<number>();
  readonly cardBrand = input<string | undefined>();
  readonly cardLastFour = input<string | undefined>();
  readonly createdAt = input<string | undefined>();
  readonly showDate = input(false);
  readonly totalLabel = input(CHECKOUT_COPY.result.total);

  methodLabel(): string {
    return this.method() === 'credit-card'
      ? CHECKOUT_COPY.methods.credit.label
      : this.method() === 'debit-card'
        ? CHECKOUT_COPY.methods.debit.label
        : CHECKOUT_COPY.methods.pix.label;
  }
}
