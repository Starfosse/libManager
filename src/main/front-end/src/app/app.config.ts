import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration, withEventReplay, withNoHttpTransferCache} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(
      withEventReplay(),
      withNoHttpTransferCache() // Aide à résoudre certains problèmes d'hydratation
    )
  ]
};
