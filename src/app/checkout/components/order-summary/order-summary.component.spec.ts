import { TestBed } from '@angular/core/testing';
import { CHECKOUT_PRODUCT } from '../../../core/services/mock-payment-gateway.service';
import { OrderSummaryComponent } from './order-summary.component';

describe('OrderSummaryComponent', () => {
  it('renders the Nexo Pro product and benefits', async () => {
    await TestBed.configureTestingModule({ imports: [OrderSummaryComponent] }).compileComponents();
    const fixture = TestBed.createComponent(OrderSummaryComponent);
    fixture.componentRef.setInput('product', CHECKOUT_PRODUCT);
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Nexo Pro');
    expect(text).toContain('R$ 79,90');
    expect(text).toContain('Projetos e tarefas ilimitados');
  });
});
