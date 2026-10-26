# Nexo Checkout

Responsive checkout simulation built with Angular 22, Tailwind CSS, NgRx, and Jasmine/Karma. The application contains payment, processing, success, and error states for the Nexo Pro monthly subscription (R$ 79,90).

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:4200/payment`.

## Verification commands

```bash
npm run format:check
npm run test:ci
npm run build
```

## Implemented directives

### Nexo interface and responsive layout

- Uses the supplied Nexo logo in the header, receipt, and purple favicon.
- Uses Tailwind CSS with the reference visual system: cool-gray background, white cards, purple primary actions, mint success accents, and red error feedback.
- Uses Phosphor Icons through the Angular Icons adapter for all generic interface icons; brand marks (Nexo, Visa, and Pix) remain their supplied assets.
- Uses a shared checkout shell for the header, security indicator, progress steps, responsive content area, and footer.
- Uses a subtle fade-and-rise transition only for the central checkout content when moving between payment, processing, success, and error states; the shared header and footer remain stable.
- Places the order summary before the payment form on mobile and beside it on desktop.
- Keeps the protected-data message at the bottom of the mobile layout and beside the summary on larger screens.
- Keeps the footer centered and stacked on mobile, then aligns copyright left and help, privacy, and terms right on larger screens.
- Keeps each component/page in separate Angular-named `.component.ts`, `.component.html`, `.component.scss`, and `.component.spec.ts` files.
- Keeps the design palette and shared form, button, accessibility, and print rules in `src/styles.scss`; component SCSS files stay intentionally minimal. Tailwind utilities consume the shared `nexo-*` theme tokens whenever a utility is available.
- Keeps shared interface copy in `src/app/core/content/checkout-copy.ts` so labels, guidance, status messages, and actions can be reviewed or translated in one place.

### Payment methods and payment details

- Supports credit card, debit card, and Pix.
- Uses the official Visa SVG asset from `public/visa.svg` and the Pix mark without Pix text from `public/pix-logo.svg`.
- Keeps the Visa mark responsive and slightly smaller beside the card-payment heading.
- Pix displays a real QR code generated from the simulated Pix payload, a copy action, and a completion action.
- Card fields format card number and expiration date, accept three- or four-digit CVV values, show contextual help, and expose only sanitized card metadata to the store.
- Card numbers ending in `0000` intentionally produce the declined-card demo outcome.
- The agreement message appears below the payment action: “Ao continuar, você concorda com os Termos de uso e a Política de privacidade.”

### Accessibility and interaction

- Uses semantic labels, field descriptions, `aria-invalid`, live regions, status announcements, and error alerts.
- Respects `prefers-reduced-motion` by disabling state transitions for users who request less motion.
- Payment methods are keyboard reachable with Tab and selectable with Enter or Space, with visible focus styling.
- Buttons expose labels and disabled/loading states, and icons are decorative unless they communicate status.
- Focus-visible styling, contrast-aware colors, responsive sizing, and mobile-friendly spacing are applied throughout.
- Pointer cursors are used only for actionable controls.

### Shared payment status experience

Processing, success, and error pages use the same `PaymentStatusShellComponent` and shared payment-details card. The details card displays the product icon, plan, user count, payment method, and total. Confirmed and failed states include the order ID; only success includes the payment date. Processing always appears before the final result and remains visible for four seconds in the mock gateway, with a purple confirmation notice asking the user not to close the page or submit again.

The success page includes a printable payment-only receipt. The error page includes the declined message, order details, retry behavior, and change-method action.

### Mock APIs and NgRx state management

There is no backend or real payment gateway. API behavior is isolated behind injectable mock services:

- `MockOrderValidationService` simulates an order-validation endpoint. It verifies the product amount, payment method, and sanitized card metadata before payment starts.
- `MockPaymentGatewayService` simulates payment authorization, creates random order IDs in `AAAA-999A9` format, waits four seconds, and returns either a receipt or a declined result.

NgRx tracks the complete checkout lifecycle in `CheckoutState`:

1. `paymentSubmitted` stores the sanitized request and sets processing/validation state.
2. `orderValidated` stores a pending order and allows the payment API call.
3. `paymentSucceeded` marks the order confirmed and stores the receipt.
4. `orderValidationFailed` or `paymentFailed` marks the order failed and stores a safe error object.
5. `paymentRetryRequested` replays the last sanitized request through validation and processing.

Full card numbers and CVV values are never stored in NgRx or browser storage. Direct refreshes of success/error routes are protected by guards and redirect to `/payment` when required state is missing.

### Testing

Jasmine/Karma tests cover the standalone components, validators, reducers, mock payment API, mock order-validation API, route guards, Pix behavior, and shared status components. The suite currently contains 27 passing tests.

## Routes

- `/payment` — checkout form and order summary
- `/success` — confirmed payment and printable receipt
- `/error` — failed payment and recovery actions

## Project structure

- `src/app/checkout/components` — reusable shell, forms, payment methods, Pix, status, and summary components
- `src/app/checkout/pages` — payment, success, and error page containers
- `src/app/checkout/store` — NgRx actions, reducer, selectors, effects, and state
- `src/app/core/services` — mocked order-validation and payment APIs
- `src/app/core/models` — product, payment, order, and validation contracts
- `src/app/core/validators` — card and expiration validators

The Pix logo reference is the [BCB Manual de Uso da Marca Pix](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/I_manual_uso_marca_pix.pdf).
