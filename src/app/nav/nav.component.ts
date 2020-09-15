import { Component, OnInit } from '@angular/core';
import { FormCreationComponent } from '../Create-Plan/form-creation/form-creation.component';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService) { 
    
  }

  ngOnInit(): void {
    //this.router.navigate(['/FormCreation']);
  }
async signOut() {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
// signOut(){
//   const URL = "https://travel-planner-project.auth.us-east-1.amazoncognito.com/logout?client_id=q24v72k1nscsoarhp395jb3m5&logout_uri=http://localhost:4200/user/login";
//   window.location.assign(URL);
// }
  onLoginClick() {
    const URL = "https://travel-planner-project.auth.us-east-1.amazoncognito.com/login?client_id=q24v72k1nscsoarhp395jb3m5&response_type=code&scope=phone+email+openid+aws.cognito.signin.user.admin+profile&redirect_uri=http://localhost:4200/home";
    window.location.assign(URL);
  }

}
