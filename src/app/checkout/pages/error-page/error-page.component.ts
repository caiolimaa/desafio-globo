import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CHECKOUT_COPY } from '../../../core/content/checkout-copy';
import { PHOSPHOR_ICON_PROVIDERS } from '../../../core/phosphor-icons';
import { PaymentStatusShellComponent } from '../../components/payment-status-shell/payment-status-shell.component';
import { PaymentResultDetailsComponent } from '../../components/payment-result-details/payment-result-details.component';
import * as CheckoutActions from '../../store/checkout.actions';
import * as CheckoutSelectors from '../../store/checkout.selectors';

@Component({
  selector: 'app-error-page',
  imports: [NgIcon, PaymentStatusShellComponent, PaymentResultDetailsComponent],
  providers: PHOSPHOR_ICON_PROVIDERS,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent {
  readonly copy = CHECKOUT_COPY;
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  readonly error = this.store.selectSignal(CheckoutSelectors.selectPaymentError);
  readonly product = this.store.selectSignal(CheckoutSelectors.selectProduct);
  readonly order = this.store.selectSignal(CheckoutSelectors.selectOrder);
  readonly declinedCardMessage = CHECKOUT_COPY.api.declined;

  methodLabel(method?: string): string {
    return method === 'credit-card' ? 'Crédito' : method === 'debit-card' ? 'Débito' : 'Pix';
  }

  retry(): void {
    this.store.dispatch(CheckoutActions.paymentRetryRequested());
    void this.router.navigateByUrl('/payment');
  }

  changeMethod(): void {
    this.store.dispatch(CheckoutActions.paymentMethodChangeRequested());
    void this.router.navigateByUrl('/payment');
  }
}
