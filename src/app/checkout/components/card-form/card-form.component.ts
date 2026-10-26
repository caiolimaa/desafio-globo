import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CHECKOUT_COPY } from '../../../core/content/checkout-copy';
import { PHOSPHOR_ICON_PROVIDERS } from '../../../core/phosphor-icons';
import { PaymentMethod, PaymentRequest } from '../../../core/models/payment.model';
import { cardNumberValidator } from '../../../core/validators/card-number.validator';
import { expirationDateValidator } from '../../../core/validators/expiration-date.validator';
import '../../../core/locale';

type CardFormModel = {
  number: FormControl<string>;
  holder: FormControl<string>;
  expiration: FormControl<string>;
  cvv: FormControl<string>;
};

@Component({
  selector: 'app-card-form',
  imports: [CurrencyPipe, NgIcon, ReactiveFormsModule],
  providers: PHOSPHOR_ICON_PROVIDERS,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
})
export class CardFormComponent {
  readonly copy = CHECKOUT_COPY;
  readonly method = input<PaymentMethod | null>(null);
  readonly amount = input.required<number>();
  readonly processing = input(false);
  readonly submitted = output<PaymentRequest>();
  readonly attempted = signal(false);

  readonly form = new FormGroup<CardFormModel>({
    number: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, cardNumberValidator],
    }),
    holder: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    expiration: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, expirationDateValidator],
    }),
    cvv: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{3,4}$/)],
    }),
  });

  constructor() {
    effect(() => {
      if (!this.processing()) this.attempted.set(false);
    });
    effect(() => {
      this.method();
      this.form.reset();
      this.attempted.set(false);
    });
  }

  showError(controlName: keyof CardFormModel): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.attempted());
  }

  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 19);
    const formatted = digits.match(/.{1,4}/g)?.join(' ') ?? '';
    input.value = formatted;
    this.form.controls.number.setValue(formatted, { emitEvent: false });
  }

  formatExpiration(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 4);
    const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    input.value = formatted;
    this.form.controls.expiration.setValue(formatted, { emitEvent: false });
  }

  formatCvv(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 4);
    input.value = digits;
    this.form.controls.cvv.setValue(digits, { emitEvent: false });
  }

  submit(): void {
    this.attempted.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid || this.processing()) return;
    const method = this.method();
    if (!method) return;
    const number = this.form.controls.number.value.replace(/\D/g, '');
    this.submitted.emit({
      method,
      amount: 0,
      cardLastFour: number.slice(-4),
      cardBrand: this.getCardBrand(number),
    });
  }

  private getCardBrand(number: string): string {
    if (/^4/.test(number)) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(number)) return 'Mastercard';
    if (/^3[47]/.test(number)) return 'American Express';
    return 'Cartão';
  }
}
