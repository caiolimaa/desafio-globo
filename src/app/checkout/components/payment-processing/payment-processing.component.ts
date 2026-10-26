import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { CHECKOUT_COPY } from '../../../core/content/checkout-copy';
import { PHOSPHOR_ICON_PROVIDERS } from '../../../core/phosphor-icons';
import { PaymentResultDetailsComponent } from '../payment-result-details/payment-result-details.component';
import { PaymentStatusShellComponent } from '../payment-status-shell/payment-status-shell.component';
import * as CheckoutSelectors from '../../store/checkout.selectors';

@Component({
  selector: 'app-payment-processing',
  imports: [NgIcon, PaymentResultDetailsComponent, PaymentStatusShellComponent],
  providers: PHOSPHOR_ICON_PROVIDERS,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.scss'],
})
export class PaymentProcessingComponent {
  readonly copy = CHECKOUT_COPY;
  private readonly store = inject(Store);
  readonly product = this.store.selectSignal(CheckoutSelectors.selectProduct);
  readonly request = this.store.selectSignal(CheckoutSelectors.selectLastRequest);
}
