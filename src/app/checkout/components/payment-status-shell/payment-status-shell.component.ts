import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CheckoutShellComponent, CheckoutStep } from '../checkout-shell/checkout-shell.component';

@Component({
  selector: 'app-payment-status-shell',
  imports: [CheckoutShellComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment-status-shell.component.html',
  styleUrls: ['./payment-status-shell.component.scss'],
})
export class PaymentStatusShellComponent {
  readonly activeStep = input<CheckoutStep>('payment');
}
