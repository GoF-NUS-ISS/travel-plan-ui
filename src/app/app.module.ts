import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// import { PlanListComponent } from './plans/plan-list/plan-list.component';
// import { PlanListInputComponent } from './plans/plan-list-input/plan-list-input.component';
import { NavComponent } from './nav/nav.component';
// import {PlanService} from './plans/Service/plans.service';
import { ToastrService } from './common/toastr.service';
import { FormCreationComponent } from './Create-Plan/form-creation/form-creation.component';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { UserModule } from './user/user.module';
import { AuthService } from './user/auth.service';
import {AgmCoreModule} from '@agm/core'
import{ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivityLegComponent } from './Create-Plan/form-creation/activity-leg/activity-leg.component';
import { TravelLegComponent } from './Create-Plan/form-creation/travel-leg/travel-leg.component';
import {AppService} from './Create-Plan/form-creation/AppService'
import {HttpClientModule} from '@angular/common/http'
import {FormCreationService} from './Create-Plan/form-creation/form.service';
// import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

@NgModule({
  declarations: [
    AppComponent,
    // PlanListComponent,
    // PlanListInputComponent,
    NavComponent,
    routingComponents,
    HomepageComponent,
    ActivityLegComponent,
    TravelLegComponent
    //FormCreationComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // AmplifyUIAngularModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwpq3QYb89Myl6ViV0nsGqmbMVUzHkERY'
    })
    
  ],
  exports: [RouterModule],
  providers: 
  [
    // PlanService, 
    ToastrService, 
    AuthService,
    FormCreationService,
    AppService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function checkDirtyState(component:FormCreationComponent){
  if(component.isDirty){
    return window.confirm('Do you want to cancel? The changes will not be saved')
  }
  else
  return true
}