import { FormControl } from '@angular/forms';
import { cardNumberValidator } from './card-number.validator';
import { expirationDateValidator } from './expiration-date.validator';

describe('payment validators', () => {
  it('validates card numbers by digit quantity', () => {
    expect(cardNumberValidator(new FormControl('4111 1111 1111 1111'))).toBeNull();
    expect(cardNumberValidator(new FormControl('4111 1111 1111 1112'))).toBeNull();
    expect(cardNumberValidator(new FormControl('0000 0000 0000 0000'))).toBeNull();
    expect(cardNumberValidator(new FormControl('4111 1111 1111'))).toEqual({ cardNumber: true });
    expect(cardNumberValidator(new FormControl('4111 1111 1111 1111 1111'))).toEqual({
      cardNumber: true,
    });
    expect(cardNumberValidator(new FormControl('4111-1111-1111-1111x'))).toEqual({
      cardNumber: true,
    });
  });

  it('accepts a future expiration date', () => {
    expect(expirationDateValidator(new FormControl('12/99'))).toBeNull();
    expect(expirationDateValidator(new FormControl('13/30'))).toEqual({ expiration: true });
  });
});
