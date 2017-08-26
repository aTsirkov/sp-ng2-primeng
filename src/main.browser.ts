// import './polyfills.browser';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import 'primeng/resources/themes/kasper/theme.css';
import 'font-awesome/css/font-awesome.min.css';
import 'primeng/resources/primeng.min.css';

//const adldapFactory = require('adldap');

export const platformRef = platformBrowserDynamic();

export function main() {
  return platformRef.bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

// support async tag or hmr
switch (document.readyState) {
  case 'interactive':
  case 'complete':
    main();
    break;
  case 'loading':
  default:
    document.addEventListener('DOMContentLoaded', () => main());
}
