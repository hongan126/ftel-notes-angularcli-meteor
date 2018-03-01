# FTEL Notes AngularCli-Meteor

This project was begin from [angularcli-meteor](https://github.com/Urigo/angular-meteor/tree/master/examples/angularcli-meteor) of Urigo.

And the same: [angularcli-meteor](https://github.com/darkbasic/angularcli-meteor) of darkbasic.

## How to run on local?

### Prerequisites
- Install NodeJS: https://nodejs.org/en/download/
- Install [AngularCLI](https://github.com/angular/angular-cli): `npm install -g @angular/cli`
- Install Meteor: https://www.meteor.com/install
- Install [Link Shell Extension](http://schinagl.priv.at/nt/hardlinkshellext/linkshellextension.html), if you run this project on Windows.

### Let's start
1. First run `npm install`
2. (Windows only) Recreate symbolic link in `~/api/` for **node_module, package.json, package-lock.json** from project directory and **declarations.d.ts** from `~/src/declarations.d.ts` by use [Link Shell Extension](http://schinagl.priv.at/nt/hardlinkshellext/linkshellextension.html)
3. `npm run api`
4. Open other terminal run cmd: `npm run meteor-client:bundle`, and then run `npm run start`

### Video
[![Watch the video](https://lh6.googleusercontent.com/L1mgvXZQZL72fVDuE0Ycgj6qQTPTtPcu8Oju_Ijg1IXuE2vBGWD8PUSXNe_dQ0T6WLScYvfkU8LDpQ=w1366-h672)](https://youtu.be/edrMI95Bnaw)

## Deployment
1. Deploy 'api' (Meteor) directory: https://github.com/hongan126/ftelnotes-api-meteor
2. Deploy 'client' (Angular): https://github.com/hongan126/ftelnotes-client-angular-dist

## Meteor server

Run `meteor` from the `api` directory to start the Meteor server.

## Bundling Meteor client

`meteor-client-bundler` is a module bundler which will take a bunch of Atmosphere package and put them into a single module, so we can load Meteor's client scripts regardless of what framework we're using to run our server.

Run `./node_modules/.bin/meteor-client bundle -s api`.

## Development server

Then run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Code scaffolding

Run `ng generate component component-name` or `ng generate component component-name --module app` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use `npm run build-prod` for a production build with AOT.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## ~/api/settings.json for deploy on Heroku
