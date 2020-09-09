import { Component } from '@angular/core'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import {NgForm} from "@angular/forms";

@Component({
  templateUrl: './login.component.html',
  styles: [`
    em { float:right; color:#E05C65; padding-left:10px; }
  `]
})
export class LoginComponent {
  emailVerificationMessage: boolean = false;

  constructor(private auth: AuthService,
              private _router: Router) {

  }

  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;
    
    this.auth.signIn(email, password).subscribe((data) => {
      this._router.navigateByUrl('/');
    }, (err)=> {
      this.emailVerificationMessage = true;
    });   
  }
}