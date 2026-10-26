import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { CHECKOUT_COPY } from '../content/checkout-copy';
import { PaymentError, PaymentReceipt, PaymentRequest } from '../models/payment.model';
import { Product } from '../models/product.model';

export const CHECKOUT_PRODUCT: Product = {
  id: CHECKOUT_COPY.product.id,
  name: CHECKOUT_COPY.product.name,
  summary: CHECKOUT_COPY.product.summary,
  price: 79.9,
  billingDescription: CHECKOUT_COPY.product.billingDescription,
  benefits: CHECKOUT_COPY.product.benefits,
  renewalNote: CHECKOUT_COPY.product.renewalNote,
};

@Injectable({ providedIn: 'root' })
export class MockPaymentGatewayService {
  process(
    request: PaymentRequest,
    product: Product = CHECKOUT_PRODUCT,
    orderId?: string,
  ): Observable<PaymentReceipt> {
    const resolvedOrderId =
      orderId ??
      `${this.randomToken(4, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')}-${this.randomToken(5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')}`;

    if (request.method !== 'pix' && request.cardLastFour === '0000') {
      const error: PaymentError = {
        code: 'DECLINED',
        message: CHECKOUT_COPY.api.declined,
        orderId: resolvedOrderId,
        method: request.method,
        cardBrand: request.cardBrand,
        cardLastFour: request.cardLastFour,
        amount: request.amount,
        createdAt: new Date().toISOString(),
      };
      return timer(4000).pipe(mergeMap(() => throwError(() => error)));
    }

    const receipt: PaymentReceipt = {
      id: resolvedOrderId,
      product,
      method: request.method,
      amount: request.amount,
      cardLastFour: request.cardLastFour,
      cardBrand: request.cardBrand,
      createdAt: new Date().toISOString(),
    };
    return of(receipt).pipe(delay(4000));
  }

  private randomToken(length: number, alphabet: string): string {
    return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join(
      '',
    );
  }
}
