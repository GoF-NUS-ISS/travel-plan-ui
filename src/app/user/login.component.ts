import { Component, OnInit, Input, inject, Inject } from '@angular/core'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import {NgForm} from "@angular/forms";
import { Auth } from 'aws-amplify';

@Component({
  templateUrl: './login.component.html',
  styles: [`
    em { float:right; color:#E05C65; padding-left:10px; }
  `]
})
export class LoginComponent implements OnInit {
  // emailVerificationMessage: boolean = false;

  // constructor(private auth: AuthService,
  //             private _router: Router) {

  // }

  // onSubmit(form: NgForm) {

  //   const email = form.value.email;
  //   const password = form.value.password;
    
  //   this.auth.signIn(email, password).subscribe((data) => {
  //     this._router.navigateByUrl('/');
  //   }, (err)=> {
  //     this.emailVerificationMessage = true;
  //   });   
  // }
  name: string = '';
  password: string = '';
  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  async loginWithCognito() {
    try {
      var user = await Auth.signIn(this.name.toString(), this.password.toString());
      console.log('Authentication performed for user=' + this.name + 'password=' + this.password + ' login result==' + user);
      var tokens = user.signInUserSession;
      if (tokens != null) {
        console.log('User authenticated');
        this.router.navigate(['home']);
        alert('You are logged in successfully !');
      }
    } catch (error) {
      console.log(error);
      alert('User Authentication failed');
    }
  }
  // isAuthenticated() {
  //   return this.name;
  // }
}