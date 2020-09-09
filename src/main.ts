import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports'; 
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// import {CognitoUser, ISignUpResult} from 'amazon-cognito-identity-js';
// import Storage from '@aws-amplify/storage';

// Auth.configure({
//   userPoolId: 'us-east-1_31kgt7sfF',
//   userPoolWebClientId: '6pocfe9h3un3s0rfbkggndgvp6'
// })
Amplify.configure(awsconfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
