import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CHECKOUT_COPY } from '../../core/content/checkout-copy';
import {
  catchError,
  concat,
  exhaustMap,
  filter,
  map,
  mergeMap,
  of,
  take,
  withLatestFrom,
} from 'rxjs';
import { CheckoutOrder, PaymentError } from '../../core/models/payment.model';
import { MockOrderValidationService } from '../../core/services/mock-order-validation.service';
import { MockPaymentGatewayService } from '../../core/services/mock-payment-gateway.service';
import * as CheckoutActions from './checkout.actions';
import { selectLastRequest, selectProduct } from './checkout.selectors';

@Injectable()
export class CheckoutEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly gateway = inject(MockPaymentGatewayService);
  private readonly orderValidation = inject(MockOrderValidationService);

  readonly submitPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.paymentSubmitted),
      exhaustMap(({ request }) =>
        this.store.select(selectProduct).pipe(
          take(1),
          exhaustMap((product) =>
            this.orderValidation.validate(request, product).pipe(
              mergeMap((validation) => {
                if (!validation.valid || !validation.order) {
                  return of(
                    CheckoutActions.orderValidationFailed({
                      error: {
                        code: 'INVALID_ORDER',
                        message: validation.message ?? CHECKOUT_COPY.api.invalidOrder,
                      },
                    }),
                  );
                }

                return concat(
                  of(CheckoutActions.orderValidated({ order: validation.order })),
                  this.gateway.process(request, product, validation.order.id).pipe(
                    map((receipt) => CheckoutActions.paymentSucceeded({ receipt })),
                    catchError((error) =>
                      of(
                        CheckoutActions.paymentFailed({
                          error: this.normalizePaymentError(error, validation.order!),
                        }),
                      ),
                    ),
                  ),
                );
              }),
              catchError(() =>
                of(
                  CheckoutActions.orderValidationFailed({
                    error: {
                      code: 'INVALID_ORDER',
                      message: CHECKOUT_COPY.api.validationFailed,
                    },
                  }),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );

  readonly retryPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.paymentRetryRequested),
      withLatestFrom(this.store.select(selectLastRequest)),
      filter(([, request]) => request !== null),
      map(([, request]) => CheckoutActions.paymentSubmitted({ request: request! })),
    ),
  );

  private normalizePaymentError(error: unknown, order: CheckoutOrder): PaymentError {
    const paymentError = error as Partial<PaymentError>;
    return {
      code: paymentError.code ?? 'UNKNOWN',
      message: paymentError.message ?? CHECKOUT_COPY.api.paymentFailed,
      orderId: paymentError.orderId ?? order.id,
      method: paymentError.method ?? order.method,
      cardBrand: paymentError.cardBrand,
      cardLastFour: paymentError.cardLastFour,
      amount: paymentError.amount ?? order.amount,
      createdAt: paymentError.createdAt,
    };
  }
}
