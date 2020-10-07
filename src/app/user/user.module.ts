import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { userRoutes } from './user.routes';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmCodeComponent } from './confirm-code/confirm-code.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from './auth.service';
import { LoaderComponent } from '../loader/loader.component';
import { AuthComponent } from './auth.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatFormFieldModule,
    RouterModule.forChild(userRoutes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AuthComponent,
    SignUpComponent,
    SignInComponent,
    ConfirmCodeComponent,
    ProfileComponent,
    LoaderComponent
    
  ],
  exports: [ ],
  providers: [
    AuthService
  ],
  entryComponents: [ LoaderComponent ]
})
export class UserModule { }