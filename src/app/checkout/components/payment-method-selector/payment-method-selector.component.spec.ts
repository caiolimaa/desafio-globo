import { TestBed } from '@angular/core/testing';
import { PaymentMethodSelectorComponent } from './payment-method-selector.component';

describe('PaymentMethodSelectorComponent', () => {
  it('exposes the three supported payment methods', async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodSelectorComponent],
    }).compileComponents();
    const component = TestBed.createComponent(PaymentMethodSelectorComponent).componentInstance;

    expect(component.options.map((option) => option.value)).toEqual([
      'credit-card',
      'debit-card',
      'pix',
    ]);
    expect(component.options.map((option) => option.label)).toEqual(['Crédito', 'Débito', 'Pix']);
  });
});
