import {
  CheckoutOrder,
  OrderValidationStatus,
  PaymentError,
  PaymentMethod,
  PaymentReceipt,
  PaymentRequest,
  PaymentStatus,
} from '../../core/models/payment.model';
import { Product } from '../../core/models/product.model';

export interface CheckoutState {
  product: Product;
  selectedMethod: PaymentMethod | null;
  lastRequest: PaymentRequest | null;
  order: CheckoutOrder | null;
  validationStatus: OrderValidationStatus;
  status: PaymentStatus;
  receipt: PaymentReceipt | null;
  error: PaymentError | null;
}
