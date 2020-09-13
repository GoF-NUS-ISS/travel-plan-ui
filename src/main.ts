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
  userPoolWebClientId: 'q24v72k1nscsoarhp395jb3m5'
})
Amplify.configure(awsconfig);

const oauth = {
  // Domain name
  domain : 'travel-planner-project.auth.us-east-1.amazoncognito.com', 
  
  // Authorized scopes
  scope : ['phone', 'email', 'profile', 'openid','aws.cognito.signin.user.admin'], 

  // Callback URL
  redirectSignIn : 'http://localhost:4200', 
  
  // Sign out URL
  redirectSignOut : 'http://localhost:4200',

  // 'code' for Authorization code grant, 
  // 'token' for Implicit grant
  responseType: 'code',

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

  function onSignUp(){
    let userData={
      // username: document.getElementById('signup-name').value,
      // email: document.getElementById('signup-email').value,
      // password: document.getElementById('signup-password').value,
      // confirmPassword: document.getElementById('signup-password').value
    }
  }