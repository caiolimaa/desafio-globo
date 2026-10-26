import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { CHECKOUT_COPY } from '../../../core/content/checkout-copy';
import { PHOSPHOR_ICON_PROVIDERS } from '../../../core/phosphor-icons';
import { PaymentMethod } from '../../../core/models/payment.model';

@Component({
  selector: 'app-payment-method-selector',
  imports: [NgIcon],
  providers: PHOSPHOR_ICON_PROVIDERS,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment-method-selector.component.html',
  styleUrls: ['./payment-method-selector.component.scss'],
})
export class PaymentMethodSelectorComponent {
  readonly copy = CHECKOUT_COPY;
  readonly selected = input<PaymentMethod | null>(null);
  readonly methodSelected = output<PaymentMethod>();

  readonly options: ReadonlyArray<{ value: PaymentMethod; label: string; description: string }> = [
    {
      value: 'credit-card',
      label: CHECKOUT_COPY.methods.credit.label,
      description: CHECKOUT_COPY.methods.credit.description,
    },
    {
      value: 'debit-card',
      label: CHECKOUT_COPY.methods.debit.label,
      description: CHECKOUT_COPY.methods.debit.description,
    },
    {
      value: 'pix',
      label: CHECKOUT_COPY.methods.pix.label,
      description: CHECKOUT_COPY.methods.pix.description,
    },
  ];

  handleKeydown(event: KeyboardEvent, method: PaymentMethod): void {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    this.methodSelected.emit(method);
  }
}
