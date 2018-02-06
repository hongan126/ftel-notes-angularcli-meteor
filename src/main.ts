import 'meteor-client';
import 'hammerjs';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {MeteorObservable} from 'meteor-rxjs';
import {Meteor} from 'meteor/meteor';



Meteor.startup(() => {
  const subscription = MeteorObservable.autorun().subscribe(() => {

    if (Meteor.loggingIn()) {
      return;
    }

    setTimeout(() => subscription.unsubscribe());
    if (environment.production) {
      enableProdMode();
    }
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.log(err));
  });
});

