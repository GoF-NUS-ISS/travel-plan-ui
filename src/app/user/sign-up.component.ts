import { Component, OnInit  } from '@angular/core'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import {NgForm} from "@angular/forms";
import {Auth} from 'aws-amplify';

@Component({
  templateUrl: './sign-up.component.html',
  styles: [`
    em { float:right; color:#E05C65; padding-left:10px; }
  `]
})
export class SignUpComponent implements OnInit  {
  name:string;
  password:string;
  email:string;
  confirmCode: boolean = false;
  constructor(private router:Router) { }
  ngOnInit(): void {
  }
  register(){
    try {
      const user = Auth.signUp({
        username: this.name,
        password: this.password,
        attributes: {
          email: this.email
        }
      });
      console.log({ user });
      alert('User signup completed , please check verify your email.');
      
      this.router.navigate(['login']);
    } catch (error) {
      console.log('error signing up:', error);
    }
    
  }
}