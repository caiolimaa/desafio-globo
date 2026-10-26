import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { CHECKOUT_COPY } from '../../../core/content/checkout-copy';
import { PHOSPHOR_ICON_PROVIDERS } from '../../../core/phosphor-icons';
import { Product } from '../../../core/models/product.model';
import '../../../core/locale';

@Component({
  selector: 'app-order-summary',
  imports: [CurrencyPipe, NgIcon],
  providers: PHOSPHOR_ICON_PROVIDERS,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
  readonly copy = CHECKOUT_COPY;
  readonly product = input.required<Product>();
}
