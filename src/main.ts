/// <reference types="@angular/localize" />

import '@angular/localize/init';
import {enableProdMode} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {appConfig} from './app/app.config';
import {environment} from './environments/environment';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';

if (environment.production) {
  enableProdMode();
}
// Registra o locale para português
registerLocaleData(localePt);

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
