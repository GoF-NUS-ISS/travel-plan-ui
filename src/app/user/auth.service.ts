import { Injectable } from '@angular/core';
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Hub, ICredentials } from '@aws-amplify/core';
import { Subject, Observable } from 'rxjs';
import { CognitoUser } from 'amazon-cognito-identity-js';

export interface NewUser {
  email: string,
  phone ?: string,
  password: string,
  name: string,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName: CognitoUser;
  uname:string;
  public loggedIn: boolean;
  private _authState: Subject<CognitoUser|any> = new Subject<CognitoUser|any>();
  authState: Observable<CognitoUser|any> = this._authState.asObservable();

  public static SIGN_IN = 'signIn';
  public static SIGN_OUT = 'signOut'; 
  public static FACEBOOK = CognitoHostedUIIdentityProvider.Facebook;
  public static GOOGLE = CognitoHostedUIIdentityProvider.Google;

  constructor() { 
    Hub.listen('auth',(data) => {
      const { channel, payload } = data;
      if (channel === 'auth') {
        this._authState.next(payload.event);
      }
    });
  }
  
  signUp(user: NewUser): Promise<CognitoUser|any> {
    return Auth.signUp({
      "username": user.name,
      "password": user.password,
      "attributes": {
        "email": user.email,
        "phone_number": user.phone
      }
    });
  }

  signIn(username: string, password: string):Promise<CognitoUser|any> {
    return new Promise((resolve,reject) => {
      Auth.signIn(username,password)
      .then((user: CognitoUser|any) => {
        this.loggedIn = true;
        resolve(user);
        this.getIdToken();
        return Auth.currentSession();
      }).catch((error: any) => reject(error));
    });
  }

  signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => this.loggedIn = false)
  }

  socialSignIn(provider:CognitoHostedUIIdentityProvider): Promise<ICredentials> {
    return Auth.federatedSignIn({
      'provider': provider
    });
  }
  info:any = {};
  user_name:string;
  user:string;
  
  async currentUserInfo(){
    this.userName =  await Auth.currentAuthenticatedUser()
    this.uname=this.userName.getUsername();
    console.log(this.uname);
    return Promise.resolve(this.uname);
  }

//   getAccessToken(callback: Callback): void {
//     if (callback == null) {
//         throw("CognitoUtil: callback in getAccessToken is null...returning");
//     }
//     if (this.currentUserInfo() != null) {
//         this.currentUserInfo().getSession(function (err, session) {
//             if (err) {
//                 console.log("CognitoUtil: Can't set the credentials:" + err);
//                 callback.callbackWithParam(null);
//             }
//             else {
//                 if (session.isValid()) {
//                     callback.callbackWithParam(session.getAccessToken().getJwtToken());
//                 }
//             }
//         });
//     }
//     else {
//         callback.callbackWithParam(null);
//     }
// }
async getAccessToken(){
  this.user = await (await Auth.currentSession()).getAccessToken().getJwtToken();
  return this.user;
}
async getIdToken(){
  this.user = await (await Auth.currentSession()).getIdToken().getJwtToken();
  return this.user;
}
async getRefreshToken(){
  this.user = await (await Auth.currentSession()).getRefreshToken().getToken();
  return this.user;
}

//   getIdToken(callback: Callback): void {
//     if (callback == null) {
//         throw("CognitoUtil: callback in getIdToken is null...returning");
//     }
//     if (this.currentUserInfo() != null)
//         this.currentUserInfo().getSession(function (err, session) {
//             if (err) {
//                 console.log("CognitoUtil: Can't set the credentials:" + err);
//                 callback.callbackWithParam(null);
//             }
//             else {
//                 if (session.isValid()) {
//                     callback.callbackWithParam(session.getIdToken().getJwtToken());
//                 } else {
//                     console.log("CognitoUtil: Got the id token, but the session isn't valid");
//                 }
//             }
//         });
//     else
//         callback.callbackWithParam(null);
// }
// getRefreshToken(callback: Callback): void {
//   if (callback == null) {
//       throw("CognitoUtil: callback in getRefreshToken is null...returning");
//   }
//   if (this.currentUserInfo() != null)
//       this.currentUserInfo().getSession(function (err, session) {
//           if (err) {
//               console.log("CognitoUtil: Can't set the credentials:" + err);
//               callback.callbackWithParam(null);
//           }

//           else {
//               if (session.isValid()) {
//                   callback.callbackWithParam(session.getRefreshToken());
//               }
//           }
//       });
//   else
//       callback.callbackWithParam(null);
// }

// refresh(): void {
//   this.currentUserInfo().getSession(function (err, session) {
//       if (err) {
//           console.log("CognitoUtil: Can't set the credentials:" + err);
//       }

//       else {
//           if (session.isValid()) {
//               console.log("CognitoUtil: refreshed successfully");
//           } else {
//               console.log("CognitoUtil: refreshed but session is still not valid");
//           }
//       }
//   });
// }
}
export interface Callback {
  callback(): void;

  callbackWithParam(result: any): void;
}
