export interface Product {
  id: string;
  name: string;
  summary: string;
  price: number;
  billingDescription: string;
  benefits: readonly string[];
  renewalNote: string;
}
