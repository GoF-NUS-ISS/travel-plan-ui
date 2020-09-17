import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
// import { ServiceWorkerModule } from '@angular/service-worker';
// import { PlanListComponent } from './plans/plan-list/plan-list.component';
// import { PlanListInputComponent } from './plans/plan-list-input/plan-list-input.component';
import { NavComponent } from './nav/nav.component';
// import {PlanService} from './plans/Service/plans.service';
import { ToastrService } from './common/toastr.service';
import { FormCreationComponent } from './Create-Plan/form-creation/form-creation.component';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
// import { AuthComponent } from './user/auth.component';
// import { SignInComponent } from './user/sign-in/sign-in.component';
// import { SignUpComponent } from './user/sign-up/sign-up.component';
// import { AuthService } from './user/auth.service';
// import { ProfileComponent } from './user/profile/profile.component';
// import { LoaderComponent } from './loader/loader.component';
// import { ConfirmCodeComponent } from './user/confirm-code/confirm-code.component';
// import { CountryCodeSelectComponent } from './user/country-code-select/country-code-select.component';
import {AgmCoreModule} from '@agm/core'
import{ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivityLegComponent } from './Create-Plan/form-creation/activity-leg/activity-leg.component';
import { TravelLegComponent } from './Create-Plan/form-creation/travel-leg/travel-leg.component';
import {AppService} from './Create-Plan/form-creation/AppService'
import {HttpClientModule} from '@angular/common/http'
import {FormCreationService} from './Create-Plan/form-creation/form.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { MaterialModule } from './material/material.module';
import { UserModule } from './user/user.module';
// import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

@NgModule({
  declarations: [
    AppComponent,
    // PlanListComponent,
    // PlanListInputComponent,
    // AuthComponent,
    // SignInComponent,
    NavComponent,
    routingComponents,
    HomepageComponent,
    ActivityLegComponent,
    TravelLegComponent,
    // SignUpComponent,
    // CountryCodeSelectComponent,
    // ConfirmCodeComponent,
    // ProfileComponent,
    // LoaderComponent
    //FormCreationComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    // AmplifyUIAngularModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwpq3QYb89Myl6ViV0nsGqmbMVUzHkERY'
    }),
    BrowserAnimationsModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    
  ],
  exports: [RouterModule, ReactiveFormsModule],
  providers: 
  [
    // PlanService, 
    ToastrService, 
    // AuthService,
    FormCreationService,
    AppService,
    AngularFireModule,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
export function checkDirtyState(component:FormCreationComponent){
  if(component.isDirty){
    return window.confirm('Do you want to cancel? The changes will not be saved')
  }
  else
  return true
}