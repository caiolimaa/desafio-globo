import { Product } from './product.model';

export type PaymentMethod = 'credit-card' | 'debit-card' | 'pix';
export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';
export type OrderValidationStatus = 'idle' | 'validating' | 'valid' | 'invalid';

export interface CheckoutOrder {
  id: string;
  productId: string;
  amount: number;
  method: PaymentMethod;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface OrderValidationResult {
  valid: boolean;
  order?: CheckoutOrder;
  message?: string;
}

export interface PaymentRequest {
  method: PaymentMethod;
  amount: number;
  cardLastFour?: string;
  cardBrand?: string;
}

export interface PaymentReceipt {
  id: string;
  product: Product;
  method: PaymentMethod;
  amount: number;
  cardLastFour?: string;
  cardBrand?: string;
  createdAt: string;
}

export interface PaymentError {
  code: 'DECLINED' | 'INVALID_ORDER' | 'UNAVAILABLE' | 'UNKNOWN';
  message: string;
  orderId?: string;
  method?: PaymentMethod;
  cardBrand?: string;
  cardLastFour?: string;
  amount?: number;
  createdAt?: string;
}
