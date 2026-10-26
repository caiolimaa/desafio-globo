import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  input,
  output,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import * as QRCode from 'qrcode';
import { CHECKOUT_COPY } from '../../../core/content/checkout-copy';
import { PHOSPHOR_ICON_PROVIDERS } from '../../../core/phosphor-icons';
import { PaymentRequest } from '../../../core/models/payment.model';

@Component({
  selector: 'app-pix-payment',
  imports: [NgIcon],
  providers: PHOSPHOR_ICON_PROVIDERS,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pix-payment.component.html',
  styleUrls: ['./pix-payment.component.scss'],
})
export class PixPaymentComponent implements AfterViewInit {
  readonly copy = CHECKOUT_COPY;
  readonly amount = input.required<number>();
  readonly processing = input(false);
  readonly complete = output<PaymentRequest>();
  @ViewChild('qrCanvas', { static: true })
  private readonly qrCanvas!: ElementRef<HTMLCanvasElement>;
  copied = false;
  readonly code = this.createPixPayload();

  async ngAfterViewInit(): Promise<void> {
    await QRCode.toCanvas(this.qrCanvas.nativeElement, this.code, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 160,
      color: { dark: '#414258', light: '#ffffff' },
    });
  }

  async copyCode(): Promise<void> {
    this.copied = true;
    if (navigator.clipboard) await navigator.clipboard.writeText(this.code);
    window.setTimeout(() => (this.copied = false), 1800);
  }

  private createPixPayload(): string {
    const payload =
      '00020126390014BR.GOV.BCB.PIX0117demo@nexo.example520400005303986540579.905802BR5908NEXO PRO6009SAO PAULO62070503***6304';
    return `${payload}${this.crc16(payload)}`;
  }

  private crc16(payload: string): string {
    let crc = 0xffff;
    for (const character of payload) {
      crc ^= character.charCodeAt(0) << 8;
      for (let bit = 0; bit < 8; bit += 1) {
        crc = (crc & 0x8000) !== 0 ? (crc << 1) ^ 0x1021 : crc << 1;
        crc &= 0xffff;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }
}
