import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { routes } from './app.routes';
import { TokenInterceptor } from './token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(BrowserAnimationsModule),  // ✅ Enable animations globally
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',   // ✅ Top-right
        timeOut: 3000,                      // ✅ 3 seconds
        easeTime: 300,                       // ✅ Slide-in ease
        progressBar: true,                   // Optional: show progress bar
        closeButton: true,                   // Optional: close button
        newestOnTop: true,                   // Newest toast on top
        preventDuplicates: true              // Prevent duplicate toasts
      })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
};
