import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CHECKOUT_COPY } from '../../../core/content/checkout-copy';
import { PHOSPHOR_ICON_PROVIDERS } from '../../../core/phosphor-icons';
import { CardFormComponent } from '../../components/card-form/card-form.component';
import { CheckoutShellComponent } from '../../components/checkout-shell/checkout-shell.component';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { PaymentMethodSelectorComponent } from '../../components/payment-method-selector/payment-method-selector.component';
import { PixPaymentComponent } from '../../components/pix-payment/pix-payment.component';
import { PaymentProcessingComponent } from '../../components/payment-processing/payment-processing.component';
import { PaymentMethod, PaymentRequest } from '../../../core/models/payment.model';
import * as CheckoutActions from '../../store/checkout.actions';
import * as CheckoutSelectors from '../../store/checkout.selectors';

@Component({
  selector: 'app-payment-page',
  imports: [
    CardFormComponent,
    CheckoutShellComponent,
    NgIcon,
    OrderSummaryComponent,
    PaymentMethodSelectorComponent,
    PixPaymentComponent,
    PaymentProcessingComponent,
  ],
  providers: PHOSPHOR_ICON_PROVIDERS,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
})
export class PaymentPageComponent {
  readonly copy = CHECKOUT_COPY;
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  readonly product = this.store.selectSignal(CheckoutSelectors.selectProduct);
  readonly selectedMethod = this.store.selectSignal(CheckoutSelectors.selectSelectedMethod);
  readonly isProcessing = this.store.selectSignal(CheckoutSelectors.selectIsProcessing);
  private readonly status = this.store.selectSignal(CheckoutSelectors.selectPaymentStatus);

  constructor() {
    effect(() => {
      if (this.status() === 'success') void this.router.navigateByUrl('/success');
      if (this.status() === 'error') void this.router.navigateByUrl('/error');
    });
  }

  selectMethod(method: PaymentMethod): void {
    this.store.dispatch(CheckoutActions.paymentMethodSelected({ method }));
  }

  submit(request: PaymentRequest): void {
    this.store.dispatch(
      CheckoutActions.paymentSubmitted({ request: { ...request, amount: this.product().price } }),
    );
  }
}
