import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { checkoutReducer } from './checkout/store/checkout.reducer';
import { CheckoutEffects } from './checkout/store/checkout.effects';
import { PHOSPHOR_ICON_PROVIDERS } from './core/phosphor-icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({ checkout: checkoutReducer }),
    provideEffects([CheckoutEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    PHOSPHOR_ICON_PROVIDERS,
  ],
};
