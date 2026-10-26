import { TestBed } from '@angular/core/testing';
import { PixPaymentComponent } from './pix-payment.component';

describe('PixPaymentComponent', () => {
  it('renders the aligned Pix instructions, QR code, and copy action', async () => {
    await TestBed.configureTestingModule({
      imports: [PixPaymentComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(PixPaymentComponent);
    fixture.componentRef.setInput('amount', 79.9);
    fixture.detectChanges();

    const qr = fixture.nativeElement.querySelector('canvas[aria-label="QR Code Pix"]');
    expect(qr).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Pague com seu App do banco');
    expect(fixture.nativeElement.textContent).toContain('Copiar código Pix');
    expect(fixture.componentInstance.code).toMatch(/^000201.*6304[A-F0-9]{4}$/);
  });
});
