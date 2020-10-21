import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { NotificationService } from 'src/app/services/notification.service';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    email: new FormControl('',[ Validators.email ]),
    fname: new FormControl('', [ Validators.min(2) ]),
    lname: new FormControl('', [ Validators.min(2) ]),
  });
  profile:any = {};
  ses1:any = {};
  ses2:any = {};
  ses3:any = {};
  user: CognitoUser;
  userName: CognitoUser;
  
  get emailInput() { return this.profileForm.get('email'); }
  get fnameInput() { return this.profileForm.get('fname'); }
  get lnameInput() { return this.profileForm.get('lname'); }

  constructor( 
    private _authService: AuthService,
    private _router: Router,
    private _notification: NotificationService,
    public loading: LoaderService ) { }

  ngOnInit() {
    this.loading.show();
    this.getUserInfo();
  }

  async getUserInfo() {
    this.profile = await Auth.currentUserInfo();
    this.ses1=await (await Auth.currentSession()).getAccessToken().getJwtToken();
    this.ses2=await (await Auth.currentSession()).getIdToken().getJwtToken();
    this.ses3=await (await Auth.currentSession()).getIdToken()
    // (await Auth.currentSession()).getRefreshToken().getToken();
    this.user = await Auth.currentAuthenticatedUser();
    this.fnameInput.setValue(this.profile.attributes['given_name']);
    this.lnameInput.setValue(this.profile.attributes['family_name']);
    this.loading.hide();
    console.log(this.ses1)
    console.log(this.ses2)
    console.log(this.ses3)
    console.log(this.user.getUsername())
  }

  async getUserName(){
    this.userName =  await Auth.currentAuthenticatedUser();
    console.log(this.userName.getUsername());
    return this.userName.getUsername()
  }

  getEmailInputError() {
    if (this.emailInput.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (this.emailInput.hasError('required')) {
      return 'An Email is required.';
    }
  }

  signOut() {
    this._authService.signOut()
      .then(() => this._router.navigate(['user/login']))
  }

  async editProfile() {
    try {
      let attributes = {
        'given_name': this.fnameInput.value,
        'family_name': this.lnameInput.value
      };
      await Auth.updateUserAttributes(this.user,attributes)
      .then(() => this._notification.show('Saved details successfully'))
    } catch (error) {
      console.log(error);
      this._notification.show(error.message);
    }
  }

}
