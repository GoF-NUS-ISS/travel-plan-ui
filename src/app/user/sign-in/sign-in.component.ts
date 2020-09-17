import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CognitoUser } from '@aws-amplify/auth';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  
  signinForm: FormGroup = new FormGroup({
    name: new FormControl('',[ Validators.required ]),
    password: new FormControl('', [ Validators.required, Validators.min(6) ])
  });
  
  hide = true;

  get nameInput() { return this.signinForm.get('name'); }
  get passwordInput() { return this.signinForm.get('password'); }

  constructor( 
    public auth: AuthService, 
    private _notification: NotificationService, 
    private _router: Router,
    private _loader: LoaderService ) { }

  getnameInputError() {
    if (this.nameInput.hasError('name')) {
      return 'Please enter a valid name address.';
    }
    if (this.nameInput.hasError('required')) {
      return 'An name is required.';
    }
  }

  getPasswordInputError() {
    if (this.passwordInput.hasError('required')) {
      return 'A password is required.';
    }
  }

  signIn() {
    this._loader.show();
    this.auth.signIn(this.nameInput.value, this.passwordInput.value)
      .then((user: CognitoUser|any) => {
        this._loader.hide();
        this._router.navigate(['']);
      })
      .catch((error: any) => {
        this._loader.hide();
        this._notification.show(error.message);
        switch (error.code) {
          case "UserNotConfirmedException":
            environment.confirm.name = this.nameInput.value;
            environment.confirm.password = this.passwordInput.value;
            this._router.navigate(['user/confirm']);
            break;
          case "UsernameExistsException":
            this._router.navigate(['user/login']);
            break;
        }
      })
  }

  async signInWithFacebook() {
    const socialResult = await this.auth.socialSignIn(AuthService.FACEBOOK);
    console.log('fb Result:', socialResult);
  }

  async signInWithGoogle() {
    const socialResult = await this.auth.socialSignIn(AuthService.GOOGLE);
    console.log('google Result:', socialResult);
  }
}
