import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CHECKOUT_COPY } from '../../../core/content/checkout-copy';
import { PHOSPHOR_ICON_PROVIDERS } from '../../../core/phosphor-icons';
import { PaymentStatusShellComponent } from '../../components/payment-status-shell/payment-status-shell.component';
import { PaymentResultDetailsComponent } from '../../components/payment-result-details/payment-result-details.component';
import * as CheckoutActions from '../../store/checkout.actions';
import * as CheckoutSelectors from '../../store/checkout.selectors';
import '../../../core/locale';

@Component({
  selector: 'app-success-page',
  imports: [
    PaymentStatusShellComponent,
    PaymentResultDetailsComponent,
    CurrencyPipe,
    DatePipe,
    NgIcon,
  ],
  providers: PHOSPHOR_ICON_PROVIDERS,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss'],
})
export class SuccessPageComponent {
  readonly copy = CHECKOUT_COPY;
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  readonly receipt = this.store.selectSignal(CheckoutSelectors.selectReceipt);
  readonly order = this.store.selectSignal(CheckoutSelectors.selectOrder);
  readonly firstName = 'Marina';
  readonly receiptEmail = 'demo@nexo.example';

  methodLabel(method: string): string {
    return method === 'pix'
      ? CHECKOUT_COPY.methods.pix.label
      : method === 'credit-card'
        ? CHECKOUT_COPY.methods.credit.label
        : CHECKOUT_COPY.methods.debit.label;
  }

  accessWorkspace(): void {
    // The challenge has no workspace route yet; keep this action ready for integration.
  }

  printReceipt(): void {
    window.print();
  }

  newPayment(): void {
    this.store.dispatch(CheckoutActions.checkoutReset());
    void this.router.navigateByUrl('/payment');
  }
}
