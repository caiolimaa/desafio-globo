import { TestBed } from '@angular/core/testing';
import { CardFormComponent } from './card-form.component';

describe('CardFormComponent', () => {
  it('formats card number and expiration values', async () => {
    await TestBed.configureTestingModule({ imports: [CardFormComponent] }).compileComponents();
    const fixture = TestBed.createComponent(CardFormComponent);
    fixture.componentRef.setInput('amount', 79.9);
    fixture.componentRef.setInput('method', 'credit-card');
    const component = fixture.componentInstance;

    const cardInput = document.createElement('input');
    cardInput.value = '4111111111111111';
    component.formatCardNumber({ target: cardInput } as unknown as Event);
    expect(component.form.controls.number.value).toBe('4111 1111 1111 1111');

    const expirationInput = document.createElement('input');
    expirationInput.value = '1229';
    component.formatExpiration({ target: expirationInput } as unknown as Event);
    expect(component.form.controls.expiration.value).toBe('12/29');

    const cvvInput = document.createElement('input');
    cvvInput.value = '12a345';
    component.formatCvv({ target: cvvInput } as unknown as Event);
    expect(component.form.controls.cvv.value).toBe('1234');
  });

  it('clears card details when the payment method changes', async () => {
    await TestBed.configureTestingModule({ imports: [CardFormComponent] }).compileComponents();
    const fixture = TestBed.createComponent(CardFormComponent);
    fixture.componentRef.setInput('amount', 79.9);
    fixture.componentRef.setInput('method', 'credit-card');
    fixture.detectChanges();

    fixture.componentInstance.form.controls.holder.setValue('MARINA ALMEIDA');
    fixture.componentRef.setInput('method', 'debit-card');
    fixture.detectChanges();

    expect(fixture.componentInstance.form.controls.holder.value).toBe('');
  });
});
