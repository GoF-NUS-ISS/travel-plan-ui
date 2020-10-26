import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports'; 
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {CognitoUser, ISignUpResult} from 'amazon-cognito-identity-js';
// import Storage from '@aws-amplify/storage';

Auth.configure({
  userPoolId: 'us-east-1_r26l8b00Y',
  userPoolWebClientId: 'q24v72k1nscsoarhp395jb3m5',
  // userPoolWebClientId: '4rs9d1auvjcnvi2d2kmrgk4a95',
  // clientSecret:'1m3f4hhdjrrfecra0q2v2gpic3idtqk925o4dspb9o167d36dtli'
})
Amplify.configure(awsconfig);

const oauth = {
  // Domain name
  domain : 'travel-planner-project.auth.us-east-1.amazoncognito.com', 
  
  // Authorized scopes
  scope : ['phone', 'email', 'profile', 'openid','aws.cognito.signin.user.admin'], 

  // Callback URL
  redirectSignIn : 'https://travel-plan-manager.com/', 
  
  // Sign out URL
  redirectSignOut : 'https://travel-plan-manager.com/',

  // 'code' for Authorization code grant, 
  // 'token' for Implicit grant
  responseType: 'token',

  // optional, for Cognito hosted ui specified options
  options: {
      // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
      AdvancedSecurityDataCollectionFlag : false
  }
}

Auth.configure({
  oauth:oauth
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
