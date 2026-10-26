import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CHECKOUT_COPY } from '../content/checkout-copy';
import { CheckoutOrder, OrderValidationResult, PaymentRequest } from '../models/payment.model';
import { Product } from '../models/product.model';

/**
 * Simulates the order-validation endpoint used before payment processing.
 * It intentionally accepts only sanitized payment data.
 */
@Injectable({ providedIn: 'root' })
export class MockOrderValidationService {
  validate(request: PaymentRequest, product: Product): Observable<OrderValidationResult> {
    const order: CheckoutOrder = {
      id: this.randomOrderId(),
      productId: product.id,
      amount: request.amount,
      method: request.method,
      status: 'pending',
    };

    const validAmount = Math.abs(request.amount - product.price) < 0.01;
    const validMethod = ['credit-card', 'debit-card', 'pix'].includes(request.method);
    const validCard =
      request.method === 'pix' ||
      (/^\d{4}$/.test(request.cardLastFour ?? '') && Boolean(request.cardBrand));

    if (!validAmount || !validMethod || !validCard) {
      return of({
        valid: false,
        message: CHECKOUT_COPY.api.invalidOrder,
      }).pipe(delay(250));
    }

    return of({ valid: true, order }).pipe(delay(250));
  }

  private randomOrderId(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphaNumeric = `${letters}0123456789`;
    const token = (length: number, alphabet: string) =>
      Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
    return `${token(4, letters)}-${token(5, alphaNumeric)}`;
  }
}
