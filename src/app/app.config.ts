import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes, 
      withViewTransitions(), 
      withInMemoryScrolling({scrollPositionRestoration: "enabled"})
    ), 
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    provideToastr(),
    provideAnimations()
    
  ]
};
