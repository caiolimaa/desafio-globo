import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app.component';
import './app/core/locale';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
