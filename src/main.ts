import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (!navigator.geolocation) {
	alert('Geolocation is not supported by your browser');
	throw new Error('Geolocation is not supported by your browser');
}
platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));
