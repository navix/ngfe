import {enableProdMode, mergeApplicationConfig} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app-config';
import AppRoot from './app/app-root/app-root';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppRoot, mergeApplicationConfig(appConfig)).then();
