import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import Amplify, { Auth } from 'aws-amplify'
import {CognitoUser, ISignUpResult, CognitoUserPool, AuthenticationDetails} from 'amazon-cognito-identity-js';
import Storage from '@aws-amplify/storage';
import { Observable } from 'rxjs/Observable';

const poolData= {
  UserPoolId: 'us-east-1_31kgt7sfF',
  ClientId: '6pocfe9h3un3s0rfbkggndgvp6'
};

const userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthService {
  cognitoUser: any;
  constructor() { }

  register(email, password) {

    const attributeList = [];

    return Observable.create(observer => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.log("signUp error", err);
          observer.error(err);
        }

        this.cognitoUser = result.user;
        console.log("signUp success", result);
        observer.next(result);
        observer.complete();
      });
    });

  }

  confirmAuthCode(code) {
    const user = {
      Username : this.cognitoUser.username,
      Pool : userPool
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log("confirmAuthCode() success", result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  signIn(email, password) { 

    const authenticationData = {
      Username : email,
      Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username : email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);
    
    return Observable.create(observer => {

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          
          //console.log(result);
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          console.log(err);
          observer.error(err);
        },
      });
    });
  }

  isLoggedIn() {    
    return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthenticatedUser().signOut();
    this.cognitoUser = null;
  }
  // currentUser:IUser
  // loginUser(userName: string, password: string) {
  //   this.currentUser = {
  //     id: 1,
  //     userName: userName,
  //     firstName: 'Keerthana',
  //     lastName: 'Jayakumar'
  //   }
  // }

  // isAuthenticated() {
  //   return !!this.currentUser;
  // }

  // updateCurrentUser(firstName:string, lastName:string) {
  //   this.currentUser.firstName = firstName
  //   this.currentUser.lastName = lastName
  // }
}