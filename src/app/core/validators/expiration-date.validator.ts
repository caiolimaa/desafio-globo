import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const expirationDateValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const value = String(control.value ?? '').replace(/\D/g, '');
  if (!value) return null;
  if (!/^\d{4}$/.test(value)) return { expiration: true };

  const month = Number(value.slice(0, 2));
  const year = 2000 + Number(value.slice(2));
  if (month < 1 || month > 12) return { expiration: true };

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  return year < currentYear || (year === currentYear && month < currentMonth)
    ? { expiration: true }
    : null;
};
