import { TestBed } from '@angular/core/testing';
import { CheckoutShellComponent } from './checkout-shell.component';

describe('CheckoutShellComponent', () => {
  it('keeps the order complete and payment active by default', async () => {
    await TestBed.configureTestingModule({ imports: [CheckoutShellComponent] }).compileComponents();
    const shell = TestBed.createComponent(CheckoutShellComponent).componentInstance;

    expect(shell.isComplete('order')).toBeTrue();
    expect(shell.isComplete('payment')).toBeFalse();
    expect(shell.isCurrent('payment')).toBeTrue();
  });

  it('marks payment complete when confirmation is active', async () => {
    await TestBed.configureTestingModule({ imports: [CheckoutShellComponent] }).compileComponents();
    const fixture = TestBed.createComponent(CheckoutShellComponent);
    fixture.componentRef.setInput('activeStep', 'confirmation');
    fixture.detectChanges();

    expect(fixture.componentInstance.isComplete('payment')).toBeTrue();
    expect(fixture.componentInstance.isComplete('confirmation')).toBeTrue();
    expect(fixture.componentInstance.isCurrent('confirmation')).toBeTrue();
  });
});
