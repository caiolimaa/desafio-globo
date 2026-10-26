import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const cardNumberValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const rawValue = String(control.value ?? '').trim();
  if (rawValue && !/^[\d\s-]+$/.test(rawValue)) return { cardNumber: true };
  const digits = rawValue.replace(/\D/g, '');
  if (!digits) return null;
  if (digits.length < 13 || digits.length > 19) return { cardNumber: true };
  return null;
};
