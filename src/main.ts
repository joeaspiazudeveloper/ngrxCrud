import { bootstrapApplication,provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { ClientReducer } from './app/Store/Client/client.reducer';
import { ClientEffects } from './app/Store/Client/client.effects';
import { provideEffects } from '@ngrx/effects';
import { appConfig } from './app/app.config';


bootstrapApplication(AppComponent, appConfig
  
).catch(err => console.error(err));
