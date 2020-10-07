import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
// import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';
import { UnauthGuard } from './unauth.guard';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';

export const userRoutes = [
  {
    path: 'login',
    component: SignInComponent,
    canActivate: [UnauthGuard]
  },
  // {
  //   path: 'signup',
  //   component: SignUpComponent,
  //   canActivate: [UnauthGuard]
  // },
  {
    path: 'confirm',
    component: ConfirmCodeComponent,
    canActivate: [UnauthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
]