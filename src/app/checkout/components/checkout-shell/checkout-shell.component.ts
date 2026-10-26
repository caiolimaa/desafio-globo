import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { CHECKOUT_COPY } from '../../../core/content/checkout-copy';
import { PHOSPHOR_ICON_PROVIDERS } from '../../../core/phosphor-icons';

export type CheckoutStep = 'payment' | 'confirmation';

@Component({
  selector: 'app-checkout-shell',
  imports: [NgIcon],
  providers: PHOSPHOR_ICON_PROVIDERS,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout-shell.component.html',
  styleUrls: ['./checkout-shell.component.scss'],
})
export class CheckoutShellComponent {
  readonly copy = CHECKOUT_COPY;
  readonly activeStep = input<CheckoutStep>('payment');
  readonly steps = [
    { key: 'order', number: 1, label: CHECKOUT_COPY.steps.order },
    { key: 'payment', number: 2, label: CHECKOUT_COPY.steps.payment },
    { key: 'confirmation', number: 3, label: CHECKOUT_COPY.steps.confirmation },
  ] as const;

  isCurrent(key: (typeof this.steps)[number]['key']): boolean {
    return key === this.activeStep();
  }

  isComplete(key: (typeof this.steps)[number]['key']): boolean {
    return (
      key === 'order' ||
      (this.activeStep() === 'confirmation' && (key === 'payment' || key === 'confirmation'))
    );
  }
}
