import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ClientReducer } from './Store/Client/client.reducer';
import { ClientEffects } from './Store/Client/client.effects';
import { AppEffects } from './Store/Common/app.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes), 
    provideAnimations(), 
  provideStore({'client':ClientReducer}),provideEffects([ClientEffects, AppEffects])]
};